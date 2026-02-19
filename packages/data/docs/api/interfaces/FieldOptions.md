[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / FieldOptions

# Interface: FieldOptions\<T\>

Defined in: data/src/field.ts:8

Configuration options for creating a new Field instance.

## Extended by

- [`CoreBooleanFieldOptions`](CoreBooleanFieldOptions.md)
- [`CoreStringFieldOptions`](CoreStringFieldOptions.md)
- [`CoreNumericFieldOptions`](CoreNumericFieldOptions.md)

## Type Parameters

### T

`T`

The type of the value stored in the field.

## Properties

### policies?

> `optional` **policies**: [`Policy`](Policy.md)\<`T`\>[]

Defined in: data/src/field.ts:13

An optional array of policies to apply to this field.
Policies can enforce validation rules, transform values, or handle constraints.
