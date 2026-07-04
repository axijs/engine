import {type DataStorage, ensurePathString, type PathType, utilsSettings} from '@axi-engine/utils';
import {type Field, type FieldGroup, type FieldNode, GroupOps, isField, isGroup, NodeFactory} from './fields';
import {isUndefined, throwIf, throwIfEmpty} from '@axijs/ensure';
import {createFieldTypeRegistry, FieldTypeRegistry} from './field-type-registry';
import {
  type CreateNodeEvent,
  type ChangeFieldEvent,
  StoreEventBus,
  type DeleteNodeEvent,
  type EventChannelMode
} from './event-bus';
import type {StoreEventSubscriber} from './event-bus/store-event-subscriber.ts';

export class Store implements DataStorage, StoreEventSubscriber {
  group: FieldGroup;
  typeRegistry: FieldTypeRegistry;

  events: StoreEventBus = new StoreEventBus();

  set eventMode(mode: EventChannelMode) {
    this.events.mode = mode;
  }

  get eventMode(): EventChannelMode {
    return this.events.mode;
  }

  constructor(options?: {
    group?: FieldGroup,
    typeRegistry?: FieldTypeRegistry
  }) {
    this.group = !isUndefined(options?.group) ? options?.group : NodeFactory.group();
    this.typeRegistry = !isUndefined(options?.typeRegistry) ? options?.typeRegistry : createFieldTypeRegistry();
  }

  getGroup() {
    return this.group;
  }

  replaceGroup(newGroup: FieldGroup) {
    this.group = newGroup;
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

  onAnyCreate(listener: (path: string) => void) {
    return this.events.createNode.onAny.subscribe(listener);
  }

  onAnyChange(listener: (path: string) => void) {
    return this.events.changeField.onAny.subscribe(listener);
  }

  onAnyDelete(listener: (path: string) => void) {
    return this.events.deleteNode.onAny.subscribe(listener);
  }

  unsubscribeOnAnyCreate(listener: (path: string) => void) {
    return this.events.createNode.onAny.unsubscribe(listener);
  }

  unsubscribeOnAnyChange(listener: (path: string) => void) {
    return this.events.changeField.onAny.unsubscribe(listener);
  }

  unsubscribeOnAnyDelete(listener: (path: string) => void) {
    return this.events.deleteNode.onAny.unsubscribe(listener);
  }

  get<T = unknown>(path: PathType): T {
    const field: Field<any> = this.getField(path);
    return (field as Field<any>).value;
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
    const oldValue = field.value;
    field.value = value;
    this.events.emitOnChange<T>(pathStr, value, oldValue);
  }

  create<T = unknown>(path: PathType, value: T): void {
    const pathStr = ensurePathString(path);
    throwIf(this.has(path), `Field by path: ${pathStr} already exists`);
    GroupOps.set(this.group, path, this.typeRegistry.createNode(value));
    this.events.emitOnCreate<T>(pathStr, value);
  }

  upsert<T = unknown>(path: PathType, value: T): void {
    this.has(path) ? this.set<T>(path, value) : this.create<T>(path, value);
  }

  delete<T = unknown>(path: PathType): void {
    const pathStr = ensurePathString(path);
    let val = undefined;
    const node = GroupOps.get(this.group, path);
    if (!isUndefined(node)) {
      if (isField(node)) {
        val = node.value;
      } else if (isGroup(node)) {
        const buffer: { path: string, node: FieldNode }[] = [];
        this.collectNodeChildrenPaths(node, pathStr, buffer);

        for (let i = buffer.length - 1; i >= 0; i--) {
          const { path: childPathStr, node: childNode } = buffer[i];
          if (this.events.deleteNode.channels.has(childPathStr)) {
            this.events.emitOnDelete(childPathStr, isField(childNode) ? childNode.value : undefined);
          }
        }
      }
    }
    throwIf(!GroupOps.remove(this.group, path), `Can't delete node by path: ${pathStr}`);
    this.events.emitOnDelete<T>(pathStr, val);
  }

  /**
   *
   */
  clear(): void {
    this.group = NodeFactory.group();
    // todo: remove data and generate propper events
  }

  /**
   * clear data end subscriptions
   */
  destroy() {
    this.group = NodeFactory.group();
    this.events.clear();
  }

  flushEvents() {
    this.events.flush();
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
