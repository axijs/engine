import {type DataStorage, ensurePathString, type PathType} from '@axi-engine/utils';
import {type Field, type FieldGroup, GroupOps, isField, NodeFactory} from './fields';
import {isUndefined, throwIf, throwIfEmpty} from '@axijs/ensure';

export class Store implements DataStorage {

  group: FieldGroup;

  constructor(options?: { group?: FieldGroup }) {
    this.group = !isUndefined(options?.group) ? options?.group : NodeFactory.group();
  }

  get<T = unknown>(path: PathType): T {
    const field: Field<any> = this.getField(path);
    return (field as Field<any>).value as T;
  }

  has(path: PathType): boolean {
    return GroupOps.has(this.group, path);
  }

  set<T = unknown>(path: PathType, value: T): void {
    const field: Field<any> = this.getField(path);
    field.value = value;
  }

  create<T = unknown>(path: PathType, value: T): void {
    throwIf(this.has(path), `Field by path: ${ensurePathString(path)} already exists`);
    // todo: registry and type detection
    GroupOps.set(this.group, path, {type: 'generic', value})
  }

  upsert(path: PathType, value: unknown): void {
    this.has(path) ? this.set(path, value) : this.create(path, value);
  }

  delete(path: PathType): void {
    throwIf(!GroupOps.remove(this.group, path), `Can't delete node by path: ${ensurePathString(path)}`);
  }

  clear(): void {

  }

  destroy() {
  }


  private getField(path: PathType): Field<any> {
    const node = GroupOps.get(this.group, path);
    throwIfEmpty(node, `Can't find field by path: ${ensurePathString(path)}`);
    throwIf(!isField(node), `Node didn't belong to the 'field' type, has type: ${node.type}`);
    return node as Field<any>;
  }
}
