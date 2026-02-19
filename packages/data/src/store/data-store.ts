import {ensurePathArray, ensurePathString, PathType, throwIfEmpty} from '@axi-engine/utils';
import {Store, StoreCreateFieldOptions} from './store';
import {
  BooleanFieldResolver,
  DataStoreFieldResolver,
  NumericFieldResolver,
  StringFieldResolver
} from './data-store-field-resolver';

import {
  CoreBooleanField,
  CoreBooleanFieldOptions, CoreField,
  CoreNumericField,
  CoreNumericFieldOptions, CoreStringField, CoreStringFieldOptions,
  Field, FieldOptions, CoreFieldTree,
  CoreFields, FieldTreeFactory, isFieldTree
} from '../fields';

export class DataStore implements Store {
  static readonly typeName = 'dataStore';
  readonly typeName = DataStore.typeName;

  private readonly resolvers: DataStoreFieldResolver[] = [];
  private _variables: CoreFields | undefined;
  private _tree: CoreFieldTree | undefined;
  private readonly _factory: FieldTreeFactory<CoreFields>;

  private get variables(): CoreFields {
    if (!this._variables) {
      this._variables = this._factory.fields();
    }
    return this._variables!;
  }

  private get tree(): CoreFieldTree {
    if (!this._tree) {
      this._tree = this._factory.tree();
    }
    return this._tree!;
  }

  constructor(treeOrFactory: CoreFieldTree | FieldTreeFactory<CoreFields>, variables?: CoreFields) {
    if (!isFieldTree(treeOrFactory)) {
      this._factory = treeOrFactory;
    } else {
      this._tree = treeOrFactory;
      this._factory = this._tree.factory;
    }
    if (variables) {
      this._variables = variables;
    }
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

    if (this.isPathToVariables(pathArr)) {
      return this.variables.get<TField>(pathArr[0]) as TField;
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
    if (this.isPathToVariables(pathArr)) {
      this.variables.remove(pathArr);
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


  /**
   * Creates a new, independent instance of the Store with a fresh, empty data state (FieldsTree).
   *
   * The new instance retains the same capabilities (e.g., factory configuration)
   * as the current one but is completely detached from the existing data hierarchy.
   * This is useful for creating local scopes, stack frames, or temporary data contexts.
   *
   * @returns {DataStore} A new, isolated DataStore instance.
   */
  createIsolated(): DataStore {
    return new DataStore(this._factory);
  }

  /** code below -> implementation of the DataStore from utils */
  has(path: PathType): boolean {
    const pathArr = ensurePathArray(path);
    if (this.isPathToVariables(pathArr)) {
      return this.variables.has(pathArr[0]);
    }
    return this.tree.hasPath(pathArr);
  }

  get(path: PathType): unknown {
    return this.getField(path).value;
  }

  set(path: PathType, value: unknown) {
    this.setValue(path, value);
  }

  create(path: PathType, value: unknown) {
    this.createValue(path, value);
  }

  upset(path: PathType, value: unknown) {
    this.upsetValue(path, value);
  }

  delete(path: PathType) {
    this.remove(path);
  }

  /**
   * @internal Used for serialization
   */
  getInternalVariables(): CoreFields | undefined {
    return this._variables;
  }

  /**
   * @internal Used for serialization
   */
  getInternalTree(): CoreFieldTree | undefined {
    return this._tree;
  }

  /**
   * @internal Used for serialization
   */
  getOrCreateInternalVariables(): CoreFields {
    return this.variables;
  }

  /**
   * @internal Used for serialization
   */
  getOrCreateInternalTree(): CoreFieldTree {
    return this.tree;
  }

  /**
   * @private
   */
  private isPathToVariables(path: PathType) {
    return ensurePathArray(path).length === 1;
  }

  /**
   * @private
   */
  private getDestinationFields(path: PathType): { fields: CoreFields, leafName: string } {
    const pathArr = ensurePathArray(path);
    if (this.isPathToVariables(pathArr)) {
      return {fields: this.variables, leafName: pathArr[0]};
    }
    const leafName = pathArr.pop()!;
    return {fields: this.tree.getOrCreateFields(path), leafName};
  }

}

