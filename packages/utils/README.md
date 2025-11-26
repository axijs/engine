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
import { randInt, clampNumber, haveSameElements } from '@axi-engine/utils';

// Get a random integer
const diceRoll = randInt(1, 7); // Returns a number between 1 and 6

// Clamp a value
const health = clampNumber(120, 0, 100); // Returns 100

// Compare arrays without order
const isSame = haveSameElements(['a', 'b'], ['b', 'a']); // Returns true
```


API Reference

Will be available when code and repository will be fully published 

<!-- 
[**Full API Documentation**](https://github.com/.../blob/main/packages/utils/docs/api/README.md)
-->



