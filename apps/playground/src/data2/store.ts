import {type DataStorage, ensurePathString, type PathType} from '@axi-engine/utils';
import {type Field, type FieldGroup, GroupOps, isField, NodeFactory} from './fields';
import {isUndefined, throwIf, throwIfEmpty} from '@axijs/ensure';
import {createFieldTypeRegistry, FieldTypeRegistry} from './field-type-registry';
import {StoreEventBus} from './event-bus/store-event-bus.ts';

export class Store implements DataStorage {
  group: FieldGroup;
  typeRegistry: FieldTypeRegistry;
  events: StoreEventBus;

  constructor(options?: {
    group?: FieldGroup,
    typeRegistry?: FieldTypeRegistry
  }) {
    this.group = !isUndefined(options?.group) ? options?.group : NodeFactory.group();
    this.typeRegistry = !isUndefined(options?.typeRegistry) ? options?.typeRegistry : createFieldTypeRegistry();
    this.events = new StoreEventBus();
  }

  get<T = unknown>(path: PathType): T {
    const field: Field<any> = this.getField(path);
    return (field as Field<any>).value;
  }

  has(path: PathType): boolean {
    return GroupOps.has(this.group, path);
  }

  set<T = unknown>(path: PathType, value: T): void {
    const field: Field<any> = this.getField(path);
    throwIf(
      !this.typeRegistry.compare(field, value),
      `Field ${ensurePathString(path)} and variable have different types:` +
      `field: '${field.type}', variable: '${this.typeRegistry.getNodeNameByVariable(value)}'`
    );
    field.value = value;
    this.events.markDirty(ensurePathString(path));
  }

  create<T = unknown>(path: PathType, value: T): void {
    throwIf(this.has(path), `Field by path: ${ensurePathString(path)} already exists`);
    GroupOps.set(this.group, path, this.typeRegistry.createNode(value))
  }

  upsert(path: PathType, value: unknown): void {
    this.has(path) ? this.set(path, value) : this.create(path, value);
  }

  delete(path: PathType): void {
    throwIf(!GroupOps.remove(this.group, path), `Can't delete node by path: ${ensurePathString(path)}`);
  }

  clear(): void {
    this.group = NodeFactory.group();
  }

  destroy() {
    // remove all subscribers and all data
  }

  private getField(path: PathType): Field<any> {
    const node = GroupOps.get(this.group, path);
    throwIfEmpty(node, `Can't find field by path: ${ensurePathString(path)}`);
    throwIf(!isField(node), `Node didn't belong to the 'field' type, has type: ${node.type}`);
    return node as Field<any>;
  }
}
