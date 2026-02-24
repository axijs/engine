[**@axi-engine/data**](../README.md)

***

[@axi-engine/data](../README.md) / CoreNumericFieldOptions

# Interface: CoreNumericFieldOptions

Defined in: packages/data/src/fields/field-definitions/core-numeric-field.ts:14

Configuration options for creating a new Field instance.

## Extends

- [`FieldOptions`](FieldOptions.md)\<`number`\>

## Properties

### max?

> `optional` **max**: `number`

Defined in: packages/data/src/fields/field-definitions/core-numeric-field.ts:16

***

### min?

> `optional` **min**: `number`

Defined in: packages/data/src/fields/field-definitions/core-numeric-field.ts:15

***

### policies?

> `optional` **policies**: [`Policy`](Policy.md)\<`number`\>[]

Defined in: packages/data/src/fields/field.ts:13

An optional array of policies to apply to this field.
Policies can enforce validation rules, transform values, or handle constraints.

#### Inherited from

[`FieldOptions`](FieldOptions.md).[`policies`](FieldOptions.md#policies)
