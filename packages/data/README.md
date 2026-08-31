# @axi-engine/data

[![NPM version](https://img.shields.io/npm/v/@axi-engine/data.svg)](https://www.npmjs.com/package/@axi-engine/data)

Tiny typed data layer for tree-based state.

## Package overview

`@axi-engine/data` is built around a typed field tree and three main pieces:

- `Store` — mutable data tree. Use it for create / read / update / delete operations on path-based values.
- `DataReferences` — typed accessors for values. They provide `FieldRef`, `NumericFieldRef`, `StringFieldRef`, `BooleanFieldRef`, and custom references.
- `CoreScope` / `Scope` — hierarchical data context with parent-child resolution and inheritance.

The package also exposes registries:

- `FieldTypeRegistry` — decides how values become typed field nodes and how equality is checked.
- `ReferenceRegistry` — decides which reference class is created for a given field type.

This gives you a simple base: store data in normalized paths, access it via typed refs, and compose logic in nested scopes.

## Install

```bash
npm install @axi-engine/data
```

Paths can be passed either as strings or arrays. The default separator is `/`.

```ts
import { utilsSettings } from '@axi-engine/utils';

console.log(utilsSettings.pathSeparator); // '/'
```

## Store

```ts
import { Store } from '@axi-engine/data';

const store = new Store();

store.create('user/name', 'Alex');
store.create('user/age', 30);
store.create(['settings', 'theme'], 'dark');

console.log(store.get(['user', 'name'])); // Alex
console.log(store.get(['user', 'age'])); // 30

store.set(['user', 'age'], 31);
store.upsert(['meta', 'online'], true);

store.delete(['settings', 'theme']);

store.onChange(['user', 'age'], (event) => {
  console.log('age changed:', event.newValue);
});

store.tick();
```

`Store` supports two event modes:

- `lazy` (default) — mutations are recorded in a change buffer, and listeners fire only when you call `store.tick()`.
- `eager` — listeners fire immediately after each mutation.

```ts
store.eventMode = 'eager';
store.set(['user', 'age'], 32); // onChange fires right away

store.eventMode = 'lazy';
store.set(['user', 'age'], 33); // queued until store.tick()
store.tick();
```

Main API:

- `create(path, value)`
- `get(path)`
- `set(path, value)`
- `upsert(path, value)`
- `delete(path)`
- `has(path)`
- `onChange`, `onDelete`, `onCreate`
- `tick()` flushes queued events

## References

Use `DataReferences` to get a typed accessor to a node.

`createAndRef` and `upsertAndRef` are convenience helpers: they write the value to the store and immediately return the matching reference for that path.

```ts
import { DataReferences, Store } from '@axi-engine/data';

const store = new Store();
const refs = new DataReferences(store);

const nameRef = refs.createAndRef(['user', 'name'], 'Alex');
const ageRef = refs.createAndRef(['user', 'age'], 30);

nameRef.value = 'Anya';
ageRef.value += 1;

console.log(store.get(['user', 'name'])); // Anya
console.log(store.get(['user', 'age'])); // 31

const statusRef = refs.upsertAndRef(['user', 'status'], 'online');
statusRef.value = 'offline';

console.log(store.get(['user', 'status'])); // offline
```

For fields that already exist, you can get a ref without mutating the store:

```ts
store.create('count', 10);

const countRef = refs.get('numeric', 'count');
countRef.value += 5;
console.log(store.get('count')); // 15
```

Common patterns:

- `refs.getBase(path)` — generic `FieldRef`
- `refs.getReadonly(path)` — read-only reference
- `refs.get('numeric', path)` — typed ref for an existing field
- `refs.getAuto(path)` — resolve type from value automatically
- `refs.createAndRef(path, value)` — create field and return the created ref
- `refs.upsertAndRef(path, value)` — create-or-update field and return the ref

## Scope

`CoreScope` gives you parent/child data resolution.

```ts
import { CoreScope } from '@axi-engine/data';

const root = new CoreScope({ name: 'root' });
root.create('theme', 'dark');

const child = root.extend('profile');
child.create(['user', 'name'], 'Alex');

console.log(child.get('theme')); // dark
console.log(child.get(['user', 'name'])); // Alex

child.set(['this', 'theme'], 'light');
console.log(root.get('theme')); // dark
console.log(child.get('theme')); // light
```

Scope rules:

- `get/set/upsert/create/delete` resolve via current scope and parent chain
- `this.someKey` targets the current scope explicitly
- `parentName.someKey` targets a named parent scope
- `extend(name?)` creates a child scope with the same type registry

## Custom types and references

If you need a custom field type, register it in the default registries.

```ts
import { Store, getDefaultFieldTypeRegistry, getDefaultReferenceRegistry, FieldRef } from '@axi-engine/data';
import type { FieldReference } from '@axi-engine/data';
import { dequal } from 'dequal';

const typeRegistry = getDefaultFieldTypeRegistry();
const referenceRegistry = getDefaultReferenceRegistry();

typeRegistry.register('array', {
  checkType: (val: unknown) => Array.isArray(val),
  checkNode: (node) => node.type === 'array',
  createNode: (val) => ({ type: 'array', value: val }),
  isValueEquivalent: (oldVal, newVal) => dequal(oldVal, newVal),
  cloneValue: (val) => [...val],
});

referenceRegistry.register('array', (store, path) => new ArrayFieldRef(store, path));

class ArrayFieldRef<T> extends FieldRef<T[]> {
  get first(): T | undefined {
    return this.value.length ? this.value[0] : undefined;
  }

  get last(): T | undefined {
    return this.value.length ? this.value[this.value.length - 1] : undefined;
  }

  get length(): number {
    return this.value.length;
  }

  get isEmpty(): boolean {
    return this.value.length === 0;
  }

  includes(item: T): boolean {
    return this.value.includes(item);
  }

  push(items: T | T[]) {
    this.value = [...this.value, ...((Array.isArray(items) ? items : [items]))];
  }

  remove(items: T | T[]) {
    const next = [...this.value];
    const target = Array.isArray(items) ? items : [items];

    for (const item of target) {
      const index = next.indexOf(item);
      if (index !== -1) next.splice(index, 1);
    }

    if (next.length !== this.value.length) {
      this.value = next;
    }
  }

  clear() {
    this.value = [];
  }
}

const store = new Store();
const refs = new DataReferences(store);
const ref = refs.createAndRef(['data', 'array'], []); 

ref.push([1, 2, 3]);
ref.remove(2);
console.log(ref.value); // [1, 3]
```

This pattern is the recommended extension point when you want `Store` to understand a new runtime type while keeping access to it ergonomic and typed.

## API docs

[Browse the API documentation](https://github.com/axijs/engine/tree/main/packages/data/docs/api)

## License

MIT

