# @axi-engine/data

[![NPM version](https://img.shields.io/npm/v/@axi-engine/data.svg)](https://www.npmjs.com/package/@axi-engine/data)

## Description

`@axi-engine/data` is a compact, reactive state management library designed around a tree of typed fields.
It provides a core data layer for the axi-engine ecosystem and can also be used as a standalone package in TypeScript applications.

The package combines:
- low-level field trees and typed field containers,
- a high-level store API for creating, reading, updating, and removing values,
- hierarchical scopes for parent/child data resolution,

It uses `@axi-engine/utils` for normalized path handling and configurable `PathType` support, allowing both string and array paths.

This package is under active development, and its API may evolve as the library grows.

## Install

```bash
npm install @axi-engine/data
```

## Quick Start

```ts
```

## Package overview



### Path handling


### Extending the system

### Scope

The `scope` layer provides hierarchical variable resolution.
`CoreScope` allows:
- named parent and child scopes,
- hierarchical `get`, `set`, `create`, `upsert`, and `delete` operations,
- scope-relative and parent-scope access via path resolution.

## Key features

- Reactive tree-based state storage
- Typed field creation with explicit and inferred types
- Data serialization and hydration support
- Isolated store instances for sandboxed contexts
- Hierarchical scope resolution across parent/child scopes
- Small dependency footprint and TypeScript-first design

## Public API


## Documentation

[**Browse the API documentation here**](https://github.com/axijs/engine/tree/main/packages/data/docs/api)

## License

MIT

