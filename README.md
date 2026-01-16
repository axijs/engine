# axi-engine

![alt text](https://img.shields.io/badge/License-MIT-yellow.svg)


## The Idea Behind It

This project grew out of my experience with two tools:
the visual novel engine Ren'Py and the rendering library Pixi.js.

I really like Ren'Py - it's a powerful and convenient tool for visual novels -
but over time I ran into several limitations. 
Because of that, I switched to Pixi.js as the base for my projects.

So I began creating a set of small, focused libraries that work well together, 
but can also be used completely on their own.

The main goal is to make it easy to add visual novel–style features to other games,
or to build complete visual novels from scratch while keeping the flexibility and control that Pixi.js provides.


**Core principles:**

* **Modular:** Every feature is a separate package. Use only what you need.
* **Lightweight:** Each package has minimal to zero dependencies.
* **Type-Safe:** Built from the ground up with TypeScript for a better and safer development experience.

## Project Status

**Note:** This is a work in progress. The API is not yet stable and is subject to change.


## Packages

This monorepo contains the following packages:

| Package | Description                                                                  |
|---|------------------------------------------------------------------------------|
| **`@axi-engine/utils`** | A set of core, low-level utilities used across the engine.                   |
| **`@axi-engine/tasks`** | A lightweight system for creating and managing skippable asynchronous tasks. |
| **`@axi-engine/tasks-anime`** | An adapter to integrate `@axi-engine/tasks` with `anime.js`.                 |
| **`@axi-engine/fields`** | A state management system.                                                   |
| **`@axi-engine/states`** | A simple finite state machine.                                               |
| **`@axi-engine/configs`** | Utilities for loading and managing game configuration files.                 |
| **`playground`** | A development app for testing and demonstrating features.                    |


## License

MIT
