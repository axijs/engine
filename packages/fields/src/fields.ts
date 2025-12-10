import {Emitter, throwIf} from '@axi-engine/utils';
import {Field} from './types';
import {FieldRegistry} from './field-registry';


export class Fields {
  readonly _fields: Map<string, Field<any>> = new Map();
  readonly _fieldRegistry: FieldRegistry;

  onAdd = new Emitter<[event: {
    name: string,
    field: Field<any>
  }]>();

  onRemove = new Emitter<[event: {
    names: string[]
  }]>();

  get fields() {
    return this._fields;
  }

  constructor(fieldRegistry: FieldRegistry) {
    this._fieldRegistry = fieldRegistry;
  }

  /**
   * Checks if a field with the given name exists in the collection.
   * @param name The name of the field to check.
   * @returns `true` if the field exists, otherwise `false`.
   */
  has(name: string) {
    return this._fields.has(name);
  }

  /**
   * Adds a pre-existing `Field` instance to the collection.
   * Throws an error if a field with the same name already exists.
   * @param field The `Field` instance to add.
   * @returns The added `Field` instance.
   */
  add<T extends Field<any>>(field: Field<any>): T {
    throwIf(this.has(field.name), `Field with name '${field.name}' already exists`);

    this._fields.set(field.name, field);

    this.onAdd.emit({
      name: field.name,
      field: field
    });

    return field as T;
  }

  create<T extends Field<any>>(
    typeName: string,
    name: string,
    initialValue: any,
    options?: any
  ): T {
    const Ctor = this._fieldRegistry.get(typeName);
    const field = new Ctor(name, initialValue, options);
    this.add(field);
    return field as T;
  }

  upset<T extends Field<any>>(
    typeName: string,
    name: string,
    value: any,
    options?: any
  ): T {
    if (this.has(name)) {
      const field = this.get<T>(name);
      field.value = value;
      return field;
    }
    return this.create<T>(typeName, name, value, options);
  }

  /**
   * Retrieves a field by its name.
   * Throws an error if the field does not exist.
   * @param name The name of the field to retrieve.
   * @returns The `Field` instance.
   */
  get<T extends Field<any>>(name: string): T {
    throwIf(!this._fields.has(name), `Field with name '${name}' not exists`);
    return this._fields.get(name)! as T;
  }

  /**
   * Removes one or more fields from the collection.
   * This method ensures that the `destroy` method of each removed field is called to clean up its resources.
   * @param names A single name or an array of names to remove.
   */
  remove(names: string | string[]) {
    const namesToRemove = Array.isArray(names) ? names : [names];
    const reallyRemoved = namesToRemove.filter(name => {
      const field = this._fields.get(name);
      if (!field) {
        return false;
      }
      field.destroy();
      return this._fields.delete(name);
    });

    if (!reallyRemoved.length) {
      return;
    }

    this.onRemove.emit({names: reallyRemoved});
  }

  /**
   * Removes all fields from the collection, ensuring each is properly destroyed.
   */
  clear() {
    this.remove(Array.from(this._fields.keys()));
  }
}
