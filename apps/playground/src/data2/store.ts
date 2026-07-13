import {type DataStorage, ensurePathString, type PathType, utilsSettings} from '@axi-engine/utils';
import {type Field, type FieldGroup, type FieldNode, GroupOps, isField, isGroup, NodeFactory} from './fields';
import {isUndefined, throwIf, throwIfEmpty} from '@axijs/ensure';
import {createFieldTypeRegistry, FieldTypeRegistry} from './field-type-registry';
import {
  type CreateNodeEvent,
  type ChangeFieldEvent,
  StoreEventBus,
  type DeleteNodeEvent, type AnyListener,
} from './event-bus';
import type {StoreEventSubscriber} from './event-bus/store-event-subscriber.ts';
import {Emitter} from '@axijs/emitter';
import {StoreChangeBuffer} from './store-change-buffer.ts';
import {type EventDispatcherMode, StoreEventDispatcher} from './store-event-dispatcher.ts';
import {ComputedManager} from './compute-fields/computed-manager.ts';

export class Store implements DataStorage, StoreEventSubscriber {
  group: FieldGroup;
  typeRegistry: FieldTypeRegistry;

  changes = new StoreChangeBuffer();
  events: StoreEventBus = new StoreEventBus();
  eventDispatcher = new StoreEventDispatcher(this.events, this.changes);
  computedManager = new ComputedManager(this);

  onClear = new Emitter();
  onGroupReplaced = new Emitter<[FieldGroup]>();

  set eventMode(mode: EventDispatcherMode) {
    this.eventDispatcher.mode = mode;
  }

  get eventMode(): EventDispatcherMode {
    return this.eventDispatcher.mode;
  }

  constructor(options?: { group?: FieldGroup, typeRegistry?: FieldTypeRegistry }) {
    this.group = options?.group ?? NodeFactory.group();
    this.typeRegistry = options?.typeRegistry ?? createFieldTypeRegistry();
  }

  getGroup() {
    return this.group;
  }

  replaceGroup(newGroup: FieldGroup) {
    this.group = newGroup;
    this.onGroupReplaced.emit(this.group);
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
    const field: Field<any> = this.getField(path);
    throwIf(
      !this.typeRegistry.compare(field, value),
      `Field ${pathStr} and variable have different types:` +
      `field: '${field.type}', variable: '${this.typeRegistry.getNodeNameByVariable(value)}'`
    );
    const oldValue = this.typeRegistry.cloneValue(field.value);
    field.value = value;
    this.changes.changed(pathStr, this.typeRegistry.cloneValue(value), oldValue);
    // this.events.emitOnChange<T>(pathStr, value, oldValue);
  }

  create<T = unknown>(path: PathType, value: T): void {
    const pathStr = ensurePathString(path);
    throwIf(this.has(path), `Field by path: ${pathStr} already exists`);
    GroupOps.set(this.group, path, this.typeRegistry.createNode(value));
    this.changes.created(pathStr, this.typeRegistry.cloneValue(value));
    // this.events.emitOnCreate<T>(pathStr, value);
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
          this.changes.deleted(
            childPathStr,
            isField(childNode) ? this.typeRegistry.cloneValue(childNode.value): undefined
          )
          //   if (this.events.deleteNode.channels.has(childPathStr)) {
          //     this.events.emitOnDelete(childPathStr, isField(childNode) ? childNode.value : undefined);
          //   }
        }
      }
    }
    throwIf(!GroupOps.remove(this.group, path), `Can't delete node by path: ${pathStr}`);
    // val can be undefined when deleted branch node
    this.changes.deleted(pathStr, val);
    // this.events.emitOnDelete<T>(pathStr, val);
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

  private getField(path: PathType): Field<any> {
    const node = GroupOps.get(this.group, path);
    throwIfEmpty(node, `Can't find field by path: ${ensurePathString(path)}`);
    throwIf(!isField(node), `Node didn't belong to the 'field' type, has type: ${node.type}`);
    return node as Field<any>;
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
