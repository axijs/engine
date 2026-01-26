[**@axi-engine/fields**](../README.md)

***

[@axi-engine/fields](../README.md) / isDataStore

# Function: isDataStore()

> **isDataStore**(`value`): `value is DataStore`

Defined in: fields/src/guards.ts:47

Type guard that checks if a value is an instance of the `DataStore` class.
It verifies this by checking the static `typeName` property on the instance.

## Parameters

### value

`unknown`

The `unknown` value to check.

## Returns

`value is DataStore`

`true` if the value is a `DataStore` instance, otherwise `false`.

## Example

```ts
function processData(source: DataStore) {
  if (isDataStore(source)) {
    // Inside this block, TypeScript now knows `source` is a full `Store`.
    // We can safely call Store-specific methods like `createFields`.
    source.createFields('new.data.group');
  } else {
    // Fallback logic for simpler data sources that are not a `Store`.
    console.warn('Cannot create new groups with a simple data source.');
  }
}
```
