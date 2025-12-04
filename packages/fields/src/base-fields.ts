// import {FieldsNodeType} from './fields-types';
// import {throwIf} from '@axi-engine/utils';
// import {FieldsFactory} from './base-fields-factory';
// import {Field} from './types';
//
// /**
//  * An abstract base class for managing a collection of `Field` instances.
//  *
//  * This class is designed to be the foundation for state management systems,
//  * such as managing stats, flags, or items.
//  *
//  * @template T The common base type for the values held by the fields in this collection.
//  */
// export abstract class BaseFields<T, F extends Field<T>> {
//   protected readonly _fields: Map<string, F> = new Map();
//   protected readonly _factory: FieldsFactory<T, F>;
//
//   get fields() {
//     return this._fields;
//   }
//
//   protected constructor(factory: FieldsFactory<T, F>) {
//     this._factory = factory;
//   }
//
//   /**
//    * Checks if a field with the given name exists in the collection.
//    * @param name The name of the field to check.
//    * @returns `true` if the field exists, otherwise `false`.
//    */
//   has(name: string) {
//     return this._fields.has(name);
//   }
//
//   /**
//    * Creates and adds a new `Field` to the collection.
//    * @param name The unique name for the new field.
//    * @param initialValue The initial value for the new field.
//    * @param options
//    * @returns The newly created `Field` instance.
//    */
//   create(name: string, initialValue: T, options?: BaseFieldOptions<T>): F {
//     return this.add(this._factory.create<T>(name, initialValue, options));
//   }
//
//   /**
//    * Adds a pre-existing `Field` instance to the collection.
//    * Throws an error if a field with the same name already exists.
//    * @param field The `Field` instance to add.
//    * @returns The added `Field` instance.
//    */
//   add(field: F): F {
//     throwIf(this.has(field.name), `Field with name '${field.name}' already exists`);
//
//     this._fields.set(field.name, field);
//
//     // todo: restore
//     // this.events.emit('created', {
//     //   fieldName: field.name,
//     //   field: field
//     // } as FieldCreatedEvent<T>);
//
//     return field;
//   }
//
//   /**
//    * Retrieves a field by its name.
//    * Throws an error if the field does not exist.
//    * @param name The name of the field to retrieve.
//    * @returns The `Field` instance.
//    */
//   get(name: string): F {
//     throwIf(!this._fields.has(name), `Field with name '${name}' not exists`);
//     return this._fields.get(name)!;
//   }
//
//   /**
//    * "Update or Insert": Updates a field's value if it exists, or creates a new one if it doesn't.
//    * @param name The name of the field.
//    * @param value The value to set.
//    * @returns The existing or newly created `Field` instance.
//    */
//   upset(name: string, value: T): F {
//     if (this.has(name)) {
//       const field = this.get(name);
//       field.value = value;
//       return field;
//     }
//     return this.create(name, value);
//   }
//
//   /**
//    * Removes one or more fields from the collection.
//    * This method ensures that the `destroy` method of each removed field is called to clean up its resources.
//    * @param names A single name or an array of names to remove.
//    */
//   remove(names: string | string[]) {
//     const namesToRemove = Array.isArray(names) ? names : [names];
//     const reallyRemoved = namesToRemove.filter(name => {
//       const field = this._fields.get(name);
//       if (!field) {
//         return false;
//       }
//       field.destroy();
//       return this._fields.delete(name);
//     });
//
//     if (!reallyRemoved.length) {
//       return;
//     }
//
//     /** todo: restore */
//     // this.events.emit('removed', {fieldNames: reallyRemoved} as FieldRemovedEvent);
//   }
//
//   /**
//    * Removes all fields from the collection, ensuring each is properly destroyed.
//    */
//   clear() {
//     this.remove(Array.from(this._fields.keys()));
//   }
//
//   /**
//    * Creates a serializable snapshot of the current state of all fields.
//    * @returns A plain JavaScript object representing the values of all fields.
//    */
//   snapshot() {
//     const dump: Record<string, any> = {
//       __type: FieldsNodeType.fields
//     };
//     this._fields.forEach((field, key) => dump[key] = field.value)
//     return dump;
//   }
//
//   /**
//    * Restores the state of the fields from a snapshot.
//    * It uses the `upset` logic to create or update fields based on the snapshot data.
//    * @param snapshot The snapshot object to load.
//    */
//   hydrate(snapshot: any) {
//     for (let key in snapshot) {
//       if (key === '__type') {
//         continue;
//       }
//       this.upset(key, snapshot[key]);
//     }
//   }
//
// }
