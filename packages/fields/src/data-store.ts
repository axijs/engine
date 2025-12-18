import {Store, StoreCreateFieldOptions} from './store';
import {
  BooleanFieldResolver,
  DataStoreFieldResolver,
  NumericFieldResolver,
  StringFieldResolver
} from './data-store-field-resolver';
import {ensurePathArray, ensurePathString, PathType, throwIfEmpty} from '@axi-engine/utils';
import {Field, FieldOptions} from './field';
import {CoreTreeNodeFactory} from './core-field-tree-factory';
import {CoreFieldTree} from './core-field-tree';
import {
  CoreBooleanField,
  CoreBooleanFieldOptions, CoreField,
  CoreNumericField,
  CoreNumericFieldOptions, CoreStringField, CoreStringFieldOptions
} from './field-definitions';
import {CoreFields} from './core-fields';
import {Fields} from './fields';
import {FieldTree} from './field-tree';

export class DataStore implements Store {
  private readonly resolvers: DataStoreFieldResolver[] = [];
  private readonly rootFieldsName = '__root_fields';

  constructor(
    private readonly tree: CoreFieldTree,
    private readonly factory: CoreTreeNodeFactory
  ) {
    this.registerResolver(new NumericFieldResolver());
    this.registerResolver(new BooleanFieldResolver());
    this.registerResolver(new StringFieldResolver());
  }

  registerResolver(resolver: DataStoreFieldResolver) {
    this.resolvers.unshift(resolver);
  }

  clearResolvers() {
    /* set length to 0 because array is readonly, so we can't just reassign them to empty array */
    this.resolvers.length = 0;
  }

  getValue<T>(path: PathType): T {
    return undefined as T;
  }

  setValue<T>(path: PathType, val: T): T {
    return undefined as T;
  }

  create<T>(path: PathType, val: T, options?: FieldOptions<T> & StoreCreateFieldOptions): Field<T> {
  }

  upset<T>(path: PathType, val: T, options?: FieldOptions<T> & StoreCreateFieldOptions): Field<T> {
  }

  createBoolean(path: PathType, val: boolean, options?: CoreBooleanFieldOptions): CoreBooleanField {

  }

  createNumeric(path: PathType, val: number, options?: CoreNumericFieldOptions): CoreNumericField {

  }

  createString(path: PathType, val: string, options?: CoreStringFieldOptions): CoreStringField {

  }

  createGeneric<T>(path: PathType, val: T, options?: FieldOptions<T>): CoreField<T> {

  }

  getBoolean(path: PathType): CoreBooleanField {

  }

  getNumeric(path: PathType): CoreNumericField {

  }

  getString(path: PathType): CoreStringField {

  }

  getGeneric<T>(path: PathType): CoreField<T> {

  }

  getField<TField extends Field<any>>(path: PathType): TField {
    const pathArr = ensurePathArray(path);
    throwIfEmpty(pathArr, `Wrong path or path is empty: ${ensurePathString(path)}, should contain at least one path segment`);

    if (pathArr.length === 1) {
      return this.getRootFields().get<F>(pathArr[0]) as TField;
    }
    const fieldName = pathArr.pop()!;
    const fields = this.tree.getFields(pathArr);
    return fields.get<TField>(fieldName);
  }

  createFields(path: PathType): CoreFields {
    return this.tree.createFields(path);
  }

  createTree(path: PathType): CoreFieldTree {
    return this.tree.createFieldTree(path);
  }

  getFields(path: PathType): CoreFields {
    return this.tree.getFields(path);
  }

  getTree(path: PathType): CoreFieldTree {
    return this.tree.getFieldTree(path);
  }

  remove(path: PathType) {
    const pathArr = ensurePathArray(path);
    throwIfEmpty(pathArr, `Wrong path or path is empty: ${ensurePathString(path)}, should contain at least one path segment`);

    /** remove field from root fields */
    if (pathArr.length === 1) {
      this.getRootFields().remove(pathArr);
      return;
    }

    const node = this.tree.findParentNode(pathArr);
    const leafName = pathArr[pathArr.length - 1];

    if (node instanceof CoreFields) {
      node.remove(leafName);
    } else if (node instanceof CoreFieldTree) {
      node.removeNode(leafName);
    }
  }

  private getRootFields(): CoreFields {
    return this.tree.has(this.rootFieldsName) ?
      this.tree.getFields(this.rootFieldsName) :
      this.tree.createFields(this.rootFieldsName);
  }
}

