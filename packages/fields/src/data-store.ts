import {DataStorage, ensurePathArray, ensurePathString, PathType, throwIfEmpty} from '@axi-engine/utils';
import {Store, StoreCreateFieldOptions} from './store';
import {
  BooleanFieldResolver,
  DataStoreFieldResolver,
  NumericFieldResolver,
  StringFieldResolver
} from './data-store-field-resolver';
import {Field, FieldOptions} from './field';
import {CoreFieldTree} from './core-field-tree';
import {
  CoreBooleanField,
  CoreBooleanFieldOptions, CoreField,
  CoreNumericField,
  CoreNumericFieldOptions, CoreStringField, CoreStringFieldOptions
} from './field-definitions';
import {CoreFields} from './core-fields';


export class DataStore implements Store, DataStorage {
  private readonly resolvers: DataStoreFieldResolver[] = [];
  private readonly rootFieldsName = '__root_fields';
  private _rootFields: CoreFields | undefined;

  private get rootFields(): CoreFields {
    if (!this._rootFields) {
      this._rootFields = this.tree.getOrCreateFields(this.rootFieldsName);
    }
    return this._rootFields!;
  }

  constructor(private readonly tree: CoreFieldTree) {
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
    return this.getField(path).value;
  }

  setValue<T>(path: PathType, val: T): T {
    /** for case when field has policies */
    const field = this.getField(path);
    field.value = val;
    return field.value;
  }

  createValue<T>(path: PathType, val: T, options?: FieldOptions<T> & StoreCreateFieldOptions): T {
    const dest = this.getDestinationFields(path);
    if (options?.fieldType) {
      return dest.fields.create(options.fieldType, dest.leafName, val, options).value;
    }
    for (let resolver of this.resolvers) {
      if (resolver.supports(val)) {
        return dest.fields.create(resolver.typeName, dest.leafName, val, options).value;
      }
    }
    return dest.fields.createGeneric<T>(dest.leafName, val, options).value;
  }

  upsetValue<T>(path: PathType, val: T, options?: FieldOptions<T> & StoreCreateFieldOptions): T {
    const dest = this.getDestinationFields(path);
    if (options?.fieldType) {
      return dest.fields.upset(options.fieldType, dest.leafName, val, options).value;
    }
    for (let resolver of this.resolvers) {
      if (resolver.supports(val)) {
        return dest.fields.upset(resolver.typeName, dest.leafName, val, options).value;
      }
    }
    return dest.fields.upsetGeneric<T>(dest.leafName, val, options).value;
  }

  createBoolean(path: PathType, initialValue: boolean, options?: CoreBooleanFieldOptions): CoreBooleanField {
    const dest = this.getDestinationFields(path);
    return dest.fields.createBoolean(dest.leafName, initialValue, options);
  }

  createNumeric(path: PathType, initialValue: number, options?: CoreNumericFieldOptions): CoreNumericField {
    const dest = this.getDestinationFields(path);
    return dest.fields.createNumeric(dest.leafName, initialValue, options);
  }

  createString(path: PathType, initialValue: string, options?: CoreStringFieldOptions): CoreStringField {
    const dest = this.getDestinationFields(path);
    return dest.fields.createString(dest.leafName, initialValue, options);
  }

  createGeneric<T>(path: PathType, initialValue: T, options?: FieldOptions<T>): CoreField<T> {
    const dest = this.getDestinationFields(path);
    return dest.fields.createGeneric<T>(dest.leafName, initialValue, options);
  }

  getBoolean(path: PathType): CoreBooleanField {
    return this.getField<CoreBooleanField>(path);
  }

  getNumeric(path: PathType): CoreNumericField {
    return this.getField<CoreNumericField>(path);
  }

  getString(path: PathType): CoreStringField {
    return this.getField<CoreStringField>(path);
  }

  getGeneric<T>(path: PathType): CoreField<T> {
    return this.getField<CoreField<T>>(path);
  }

  getField<TField extends Field<any>>(path: PathType): TField {
    const pathArr = ensurePathArray(path);
    throwIfEmpty(pathArr, `Wrong path or path is empty: ${ensurePathString(path)}, should contain at least one path segment`);

    if (this.isPathToRootFields(pathArr)) {
      return this.rootFields.get<TField>(pathArr[0]) as TField;
    }
    const fieldName = pathArr.pop()!;
    const fields = this.tree.getFields(pathArr);
    return fields.get<TField>(fieldName);
  }

  createFields(path: PathType): CoreFields {
    return this.tree.createFields(path, true);
  }

  createTree(path: PathType): CoreFieldTree {
    return this.tree.createFieldTree(path, true);
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
    if (this.isPathToRootFields(pathArr)) {
      this.rootFields.remove(pathArr);
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

  private isPathToRootFields(path: PathType) {
    return ensurePathArray(path).length === 1;
  }

  private getDestinationFields(path: PathType): { fields: CoreFields, leafName: string } {
    const pathArr = ensurePathArray(path);
    if (this.isPathToRootFields(pathArr)) {
      return {fields: this.rootFields, leafName: pathArr[0]};
    }
    const leafName = pathArr.pop()!;
    return {fields: this.tree.getOrCreateFields(path), leafName };
  }

  has(path: PathType): boolean {
    return false;
  }

  /** implementation of the DataStore from utils */
  get(path: PathType): unknown {
    return 0;
  }

  set(path: PathType, value: unknown) {

  }

  create(path: PathType, value: unknown) {

  }

  delete(path: PathType) {

  }
}

