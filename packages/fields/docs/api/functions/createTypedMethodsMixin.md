[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / createTypedMethodsMixin

# Function: createTypedMethodsMixin()

> **createTypedMethodsMixin**\<`TCtor`, `TBaseName`\>(`typeName`, `baseMethodName`): \<`TBase`\>(`Base`) => `Constructor`\<`InstanceType`\<`TBase`\> & `` { [K in `create${string}`]: (name: string, initialValue: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor> } `` & `` { [K in `upset${string}`]: (name: string, value: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor> } `` & `` { [K in `get${string}`]: (name: string) => InstanceType<TCtor> } ``\>

Defined in: fields/src/mixins/mixin-factory.ts:33

A higher-order function that generates a mixin for a specific Field type.
This factory removes the need to write boilerplate mixin code for every new field type.

## Type Parameters

### TCtor

`TCtor` *extends* `Constructor`\<[`Field`](../interfaces/Field.md)\<`any`\>\>

### TBaseName

`TBaseName` *extends* `string`

## Parameters

### typeName

`string`

The `typeName` of the Field to create (e.g., 'boolean', 'my-signal-field').

### baseMethodName

`TBaseName`

The base name for the generated methods (e.g., 'Boolean', 'MySignal').

## Returns

A fully functional, typed mixin.

> \<`TBase`\>(`Base`): `Constructor`\<`InstanceType`\<`TBase`\> & `` { [K in `create${string}`]: (name: string, initialValue: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor> } `` & `` { [K in `upset${string}`]: (name: string, value: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor> } `` & `` { [K in `get${string}`]: (name: string) => InstanceType<TCtor> } ``\>

### Type Parameters

#### TBase

`TBase` *extends* `Constructor`\<[`Fields`](../classes/Fields.md)\>

### Parameters

#### Base

`TBase`

### Returns

`Constructor`\<`InstanceType`\<`TBase`\> & `` { [K in `create${string}`]: (name: string, initialValue: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor> } `` & `` { [K in `upset${string}`]: (name: string, value: GetValueType<InstanceType<TCtor>>, options?: ConstructorParameters<TCtor>[2]) => InstanceType<TCtor> } `` & `` { [K in `get${string}`]: (name: string) => InstanceType<TCtor> } ``\>
