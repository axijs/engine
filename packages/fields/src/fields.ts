import {Emitter, throwIf} from '@axi-engine/utils';
import {FieldRegistry} from './field-registry';
import {Field} from './field';

/**
 * A container for a collection of named `Field` instances.
 *
 * This class acts as a "leaf" node in the `FieldTree` hierarchy, managing a flat
 * key-value store of reactive data points. It uses a `FieldRegistry` to dynamically
 * create `Field` instances of different types.
 */
export class Fields {
  static readonly typeName = 'fields';
  readonly typeName = Fields.typeName;


  readonly _fields: Map<string, Field<any>> = new Map();
  readonly _fieldRegistry: FieldRegistry;

  /**
   * An event emitter that fires when a new field is added to the collection.
   * @event
   * @param {object} event - The event payload.
   * @param {string} event.name - The name of the added field.
   * @param {Field<any>} event.field - The `Field` instance that was added.
   */
  onAdd = new Emitter<[event: {
    name: string,
    field: Field<any>
  }]>();

  /**
   * An event emitter that fires after one or more fields have been removed.
   * @event
   * @param {object} event - The event payload.
   * @param {string[]} event.names - An array of names of the fields that were successfully removed.
   */
  onRemove = new Emitter<[event: {
    names: string[]
  }]>();

  /**
   * Gets the read-only map of all `Field` instances in this container.
   * @returns {Map<string, Field<any>>} The collection of fields.
   */
  get fields(): Map<string, Field<any>> {
    return this._fields;
  }

  /**
   * Creates an instance of Fields.
   * @param {FieldRegistry} fieldRegistry - The registry used to create new `Field` instances.
   */
  constructor(fieldRegistry: FieldRegistry) {
    this._fieldRegistry = fieldRegistry;
  }

  /**
   * Checks if a field with the given name exists in the collection.
   * @param {string} name The name of the field to check.
   * @returns {boolean} `true` if the field exists, otherwise `false`.
   */
  has(name: string): boolean {
    return this._fields.has(name);
  }

  /**
   * Adds a pre-existing `Field` instance to the collection and fires the `onAdd` event.
   * @template T - The specific `Field` type being added.
   * @param {Field<any>} field - The `Field` instance to add.
   * @returns {T} The added `Field` instance, cast to type `T`.
   * @throws If a field with the same name already exists.
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

  /**
   * Creates a new `Field` instance of a specified type, adds it to the collection, and returns it.
   * This is the primary factory method for creating fields within this container.
   * @template T - The expected `Field` type to be returned.
   * @param {string} typeName - The registered type name of the field to create (e.g., 'numeric', 'boolean').
   * @param {string} name - The unique name for the new field.
   * @param {*} initialValue - The initial value for the new field.
   * @param {*} [options] - Optional configuration passed to the field's constructor.
   * @returns {T} The newly created `Field` instance.
   */
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

  /**
   * Updates an existing field's value or creates a new one if it doesn't exist.
   * @template T - The expected `Field` type.
   * @param {string} typeName - The type name to use if a new field needs to be created.
   * @param {string} name - The name of the field to update or create.
   * @param {*} value - The new value to set.
   * @param {*} [options] - Optional configuration, used only if a new field is created.
   * @returns {T} The existing or newly created `Field` instance.
   */
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
   * @template T - The expected `Field` type to be returned.
   * @param {string} name - The name of the field to retrieve.
   * @returns {T} The `Field` instance.
   * @throws If the field does not exist.
   */
  get<T extends Field<any>>(name: string): T {
    throwIf(!this._fields.has(name), `Field with name '${name}' not exists`);
    return this._fields.get(name)! as T;
  }

  /**
   * Removes one or more fields from the collection.
   * This method ensures that the `destroy` method of each removed field is called to clean up its resources.
   * @param {string| string[]} names A single name or an array of names to remove.
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
