# @axi-engine/utils

[![NPM version](https://img.shields.io/npm/v/@axi-engine/utils.svg)](https://www.npmjs.com/package/@axi-engine/utils)

Core utility library for Axi Engine.

Provides a set of common, standalone functions for arrays, math, type guards, random generation, and more.

## Installation

```bash
npm install @axi-engine/utils
```

## Usage

Here are a few examples of how to use the utilities from this package:

```typescript
import {randInt, clampNumber, haveSameElements} from '@axi-engine/utils';

// Get a random integer
const diceRoll = randInt(1, 7); // Returns a number between 1 and 6

// Clamp a value
const health = clampNumber(120, 0, 100); // Returns 100

// Compare arrays without order
const isSame = haveSameElements(['a', 'b'], ['b', 'a']); // Returns true
```

## Core Utilities

- **Registry**: A generic, type-safe wrapper around `Map` for managing collections of items with built-in validations.
- **Easings**: Type-safe registry of mathematical easing functions. [Read more](https://github.com/axijs/engine/tree/main/packages/utils/docs/easing.md)
- **Time**: Shared interface (`TimeContext`) for engine-wide time transformations and game loops.
- **General Helpers**: A set of pure functions for arrays, math, paths, and random generation.

## API Reference

[**Browse the API Documentation here**](https://github.com/axijs/engine/tree/main/packages/utils/docs/api)



