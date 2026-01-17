import {Constructor} from '@axi-engine/utils';
import {Field} from '../field';
import {Fields} from '../fields';

/**
 * extract field type
 */
type GetValueType<TField extends Field<any>> = TField extends Field<infer U> ? U : any;

/**
 * A mapped type that creates the method signatures for a typed mixin.
 * e.g., createBoolean, upsetBoolean, getBoolean
 */
type TypedMethods<
  TCtor extends Constructor<Field<any>>,
  TBaseName extends string
> = {
  [K in `create${TBaseName}`]: (name: string, initialValue: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor>;
} & {
  [K in `upset${TBaseName}`]: (name: string, value: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor>;
} & {
  [K in `get${TBaseName}`]: (name: string) => InstanceType<TCtor>;
};

/**
 * A higher-order function that generates a mixin for a specific Field type.
 * This factory removes the need to write boilerplate mixin code for every new field type.
 *
 * @param typeName The `typeName` of the Field to create (e.g., 'boolean', 'my-signal-field').
 * @param baseMethodName The base name for the generated methods (e.g., 'Boolean', 'MySignal').
 * @returns A fully functional, typed mixin.
 */
export function createTypedMethodsMixin<
  TCtor extends Constructor<Field<any>>,
  TBaseName extends string
>(
  typeName: string,
  baseMethodName: TBaseName
) {
  const methodNames = {
    create: `create${baseMethodName}`,
    upset: `upset${baseMethodName}`,
    get: `get${baseMethodName}`,
  };

  return function <TBase extends Constructor<Fields>>(Base: TBase):
    Constructor<InstanceType<TBase> & TypedMethods<TCtor, TBaseName>>
  {
    return class FieldsWith extends Base {
      // createBoolean, createMySignal, etc.
      [methodNames.create](name: string, initialValue: any, options?: ConstructorParameters<TCtor>[2]): InstanceType<TCtor> {
        return this.create(typeName, name, initialValue, options) as InstanceType<TCtor>;
      }

      // upsetBoolean, upsetMySignal, etc.
      [methodNames.upset](name: string, value: any, options?: ConstructorParameters<TCtor>[2]): InstanceType<TCtor> {
        return this.upset(typeName, name, value, options) as InstanceType<TCtor>;
      }

      // getBoolean, getMySignal, etc.
      [methodNames.get](name: string): InstanceType<TCtor> {
        return this.get(name);
      }
    } as any;
  }
}
