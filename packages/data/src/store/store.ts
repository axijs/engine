import {type DataStorage, ensurePathString, type PathType, utilsSettings} from '@axi-engine/utils';
import {isUndefined, throwIf, throwIfEmpty} from '@axijs/ensure';
import {Emitter} from '@axijs/emitter';
import {
  type Field,
  type FieldGroup,
  type FieldName,
  type FieldNode,
  GroupOps,
  isField,
  isGroup,
  NodeFactory
} from '../fields';
import {FieldTypeRegistry} from '../field-type-registry';
import {
  type CreateNodeEvent,
  type ChangeFieldEvent,
  StoreEventBus,
  type DeleteNodeEvent, type AnyListener,
  StoreEventSubscriber,
} from '../event-bus';
import {StoreChangeBuffer} from './store-change-buffer';
import {type EventDispatcherMode, StoreEventDispatcher} from './store-event-dispatcher';
import {
  type FieldReference,
  type FieldReferenceName,
  type FieldReferences,
  type ReadonlyFieldReference,
  type ReferenceSource
} from '../references';
import {ReferenceRegistry} from '../reference-registry';
import {getDefaultReferenceRegistry, getDefaultTypeRegistry} from '../config';

export class Store implements DataStorage, StoreEventSubscriber, ReferenceSource {
  group: FieldGroup;
  typeRegistry: FieldTypeRegistry;
  referenceRegistry: ReferenceRegistry;

  changes = new StoreChangeBuffer();
  events: StoreEventBus = new StoreEventBus();
  eventDispatcher = new StoreEventDispatcher(this.events, this.changes);
  private readonlyPaths = new Set<string>();

  onClear = new Emitter();
  onGroupReplaced = new Emitter<FieldGroup>();

  set eventMode(mode: EventDispatcherMode) {
    this.eventDispatcher.mode = mode;
  }

  get eventMode(): EventDispatcherMode {
    return this.eventDispatcher.mode;
  }

  constructor(options?: {
    group?: FieldGroup,
    typeRegistry?: FieldTypeRegistry,
    referenceRegistry?: ReferenceRegistry
  }) {
    this.group = options?.group ?? NodeFactory.group();
    this.typeRegistry = options?.typeRegistry ?? getDefaultTypeRegistry();
    this.referenceRegistry = options?.referenceRegistry ?? getDefaultReferenceRegistry();
  }

  getGroup() {
    return this.group;
  }

  replaceGroup(newGroup: FieldGroup) {
    this.group = newGroup;
    this.onGroupReplaced.emit(this.group);
  }

  markAsReadonly(path: PathType) {
    this.readonlyPaths.add(ensurePathString(path));
  }

  unmarkAsReadonly(path: PathType) {
    this.readonlyPaths.delete(ensurePathString(path));
  }

  onCreate<T = unknown>(path: PathType, listener: (event: CreateNodeEvent<T>) => void) {
    return this.events.onCreate(path, listener);
  }

  onChange<T = unknown>(path: PathType, listener: (event: ChangeFieldEvent<T>) => void) {
    return this.events.onChange(path, listener);
  }

  onDelete<T = unknown>(path: PathType, listener: (event: DeleteNodeEvent<T>) => void) {
    return this.events.onDelete(path, listener);
  }

  unsubscribeOnCreate<T = unknown>(path: PathType, listener: (event: CreateNodeEvent<T>) => void) {
    return this.events.unsubscribeOnCreate(path, listener);
  }

  unsubscribeOnChange<T = unknown>(path: PathType, listener: (event: ChangeFieldEvent<T>) => void) {
    return this.events.unsubscribeOnChange(path, listener);
  }

  unsubscribeOnDelete<T = unknown>(path: PathType, listener: (event: DeleteNodeEvent<T>) => void) {
    return this.events.unsubscribeOnDelete(path, listener);
  }

  onAnyCreate(listener: AnyListener) {
    return this.events.createNode.onAny.subscribe(listener);
  }

  onAnyChange(listener: AnyListener) {
    return this.events.changeField.onAny.subscribe(listener);
  }

  onAnyDelete(listener: AnyListener) {
    return this.events.deleteNode.onAny.subscribe(listener);
  }

  unsubscribeOnAnyCreate(listener: AnyListener) {
    return this.events.createNode.onAny.unsubscribe(listener);
  }

  unsubscribeOnAnyChange(listener: AnyListener) {
    return this.events.changeField.onAny.unsubscribe(listener);
  }

  unsubscribeOnAnyDelete(listener: AnyListener) {
    return this.events.deleteNode.onAny.unsubscribe(listener);
  }

  get<T = unknown>(path: PathType): T {
    return this.getField(path).value;
  }

  has(path: PathType): boolean {
    return GroupOps.has(this.group, path);
  }

  set<T = unknown>(path: PathType, value: T): void {
    const pathStr = ensurePathString(path);
    throwIf(this.readonlyPaths.has(pathStr),  `Field '${pathStr}' is readonly (computed)`);

    const field: Field<any> = this.getField(path);
    throwIf(
      !this.typeRegistry.compare(field, value),
      `Field '${pathStr}' and variable have different types:` +
      `field: '${field.type}', variable: '${this.typeRegistry.getNodeNameByVariable(value)}'`
    );

    if (this.typeRegistry.isValueEquivalent(field, value)) {
      return;
    }

    const oldValue = this.typeRegistry.cloneValue(field.value);
    field.value = value;
    this.changes.changed(pathStr, this.typeRegistry.cloneValue(value), oldValue);
    this.eventDispatcher.eagerChanged(pathStr);
  }

  create<T = unknown>(path: PathType, value: T): void {
    const pathStr = ensurePathString(path);
    throwIf(this.has(path), `Field by path: ${pathStr} already exists`);
    GroupOps.set(this.group, path, this.typeRegistry.createNode(value));
    this.changes.created(pathStr, this.typeRegistry.cloneValue(value));
    this.eventDispatcher.eagerCreated(pathStr);
  }

  upsert<T = unknown>(path: PathType, value: T): void {
    this.has(path) ? this.set<T>(path, value) : this.create<T>(path, value);
  }

  delete(path: PathType): void {
    const pathStr = ensurePathString(path);
    let val = undefined;
    const node = GroupOps.get(this.group, path);
    if (!isUndefined(node)) {
      if (isField(node)) {
        val = this.typeRegistry.cloneValue(node.value);
      } else if (isGroup(node)) {
        const buffer: { path: string, node: FieldNode }[] = [];
        this.collectNodeChildrenPaths(node, pathStr, buffer);
        for (let i = buffer.length - 1; i >= 0; i--) {
          const { path: childPathStr, node: childNode } = buffer[i];
          this.clearOnDeleteNode(
            childPathStr,
            isField(childNode) ? this.typeRegistry.cloneValue(childNode.value): undefined
          );
        }
      }
    }
    throwIf(!GroupOps.remove(this.group, path), `Can't delete node by path: ${pathStr}`);
    this.clearOnDeleteNode(pathStr, val);
  }

  /**
   *
   */
  clear(): void {
    this.group = NodeFactory.group();
    this.changes.clear();
    this.events.clear();
    this.onClear.emit();
  }

  tick() {
    this.eventDispatcher.flush();
    this.changes.clear();
  }

  getRef<T = unknown>(path: PathType): FieldReference<T> {
    return this.referenceRegistry.create('generic', this, path);
  }

  getReadonlyRef<T = unknown>(path: PathType): ReadonlyFieldReference<T> {
    return this.referenceRegistry.create('readonly', this, path);
  }

  getTypedRef<K extends FieldReferenceName>(type: K, path: PathType): FieldReferences[K] {
    return this.referenceRegistry.create(type, this, path);
  }

  getAutoRef<T extends FieldReference<any>>(path: PathType): T {
    const fieldType = this.getField(path).type as FieldName;
    return this.referenceRegistry.create(fieldType, this, path) as T;
  }

  createRef<R extends FieldReference<any> = FieldReference<any>>(path: PathType, value: R['value']): R {
    this.create(path, value);
    return this.getAutoRef<R>(path);
  }

  upsertRef<R extends FieldReference<any> = FieldReference<any>>(path: PathType, value: R['value']): R {
    this.upsert(path, value);
    return this.getAutoRef<R>(path);
  }

  private getField(path: PathType): Field<any> {
    const node = GroupOps.get(this.group, path);
    throwIfEmpty(node, `Can't find field by path: ${ensurePathString(path)}`);
    throwIf(!isField(node), `Node didn't belong to the 'field' type, has type: ${node.type}`);
    return node as Field<any>;
  }

  private clearOnDeleteNode(pathStr: string, val: unknown) {
    this.changes.deleted(pathStr, val);
    this.eventDispatcher.eagerDeleted(pathStr);
    this.readonlyPaths.delete(pathStr);
  }

  private collectNodeChildrenPaths(
    node: FieldGroup,
    nodePath: string,
    buffer: { path: string, node: FieldNode }[]
  ) {
    const keys = Object.keys(node.items);
    for (let key of keys) {
      const nodeChild = node.items[key];
      const nodeChildPath = nodePath + utilsSettings.pathSeparator + key;
      buffer.push({path: nodeChildPath, node: nodeChild});
      if (isGroup(nodeChild)) {
        this.collectNodeChildrenPaths(nodeChild, nodeChildPath, buffer);
      }
    }
  }
}
