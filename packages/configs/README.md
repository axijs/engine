# @axi-engine/configs

[![NPM version](https://img.shields.io/npm/v/@axi-engine/utils.svg)](https://www.npmjs.com/package/@axi-engine/configs)


## Description

A lightweight, type-safe, and hierarchical configuration resolver. 
It allows you to manage complex configurations by defining variants
that inherit properties from one another, reducing duplication.

Installation

This package requires @axi-engine/utils as a peer dependency. You need to install both:
code 

```bash
npm install @axi-engine/configs @axi-engine/utils
```

## Usage

The main idea is to define a base configuration and then create specialized 
variants that `extend` it. 
The resolver will automatically merge them for you.

Here is a quick example:

```typescript
import { ConfigResolver, ConfigTree } from '@axi-engine/configs';

// 1. Define your configuration structure
interface ComponentConfig {
  visible: boolean;
  x: number;
  y: number;
  sprite: string;
}

// 2. Create the configuration tree
const uiConfig: ConfigTree<ComponentConfig> = {
  base: {
    fields: {
      visible: true,
      x: 0,
      y: 0,
      sprite: 'default.png',
    },
  },
  mainMenu: {
    button: {
      extends: 'base', // Inherits from the base config
      fields: {
        x: 100, // Overrides base 'x'
        sprite: 'button.png', // Overrides base 'sprite'
      },
    },
  },
};

// 3. Initialize the resolver and get the final config
const resolver = new ConfigResolver<ComponentConfig>(uiConfig);
const buttonConfig = resolver.get('mainMenu/button');

console.log(buttonConfig);

/*
Output:
{
  visible: true,        // from 'base'
  x: 100,               // from 'mainMenu/button'
  y: 0,                 // from 'base'
  sprite: 'button.png'  // from 'mainMenu/button'
}
*/
```

## License

MIT
