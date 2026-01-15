# Async Tasks

@axi-engine/tasks

![alt text](https://img.shields.io/npm/v/@axi-engine/tasks.svg)

A lightweight utility for creating and composing skippable asynchronous tasks. 

## The Core Problem

I created this toolkit to address a limitation I faced with standard Promises. 
While they work well for managing single asynchronous operations, 
they offer no built-in way to skip a sequence of them, 
such as a multi-stage animation.

@axi-engine/tasks solves this by wrapping a promise in a CompletableTask interface. 
This adds a .complete() method, providing the necessary control to build skippable asynchronous sequences.


## Features
-   **Composable:** Chain tasks together using `Tasks.sequence` or run them concurrently with `Tasks.parallel`.
-   **Skippable:** Every task can be instantly finished by calling its `.complete()` method.
-   **Cancellable:** Provides a `.cancel()` method for aborting tasks.
-   **Versatile:** Create tasks from promises, timers (`wait`), synchronous functions, and animations.
-   **Lightweight:** Zero dependencies and a tiny footprint.

## Installation

```bash
npm install @axi-engine/tasks
```

## Core Concept: `CompletableTask`

A `CompletableTask` is an object that contains two key properties:
-   `promise`: A standard `Promise` that resolves when the task finishes.
-   `complete`: A function that immediately finishes the task and resolves the promise.

Some tasks also implement the `AsyncTask` interface, which adds a `cancel` method.

## API & Usage

All factory functions are available through the `Tasks` object.

```typescript
import { Tasks } from '@axi-engine/tasks';
```

### `Tasks.sequence`

Runs a series of tasks one after another. This is the primary tool for scripting.

```typescript
const myCutscene = Tasks.sequence([
  Tasks.sync(() => console.log('Scene starts...')),
  Tasks.wait(1000), // Wait for 1 second
  Tasks.sync(() => console.log('Character speaks.')),
  Tasks.wait(2000)
]);

// To skip the cutscene at any time (e.g., on a button click)
button.onclick = () => {
  myCutscene.complete();
};

await myCutscene.promise;
console.log('Cutscene finished!');
```

### `Tasks.parallel`

Runs multiple tasks concurrently. The group task finishes when all child tasks are complete.

```typescript
const showUI = Tasks.parallel([
  fadeIn(background),
  slideIn(title),
  popIn(buttons)
]);

await showUI.promise;
console.log('All UI elements are now visible.');
```

### `Tasks.wait`

Creates a task that waits for a specified duration.

```typescript
console.log('Waiting...');
await Tasks.wait(500).promise;
console.log('Done waiting.');
```

### `Tasks.controllable`

Creates a task that can be resolved or rejected from outside. 
This is perfect for waiting for user input or other external events.

```typescript
const { task, controller } = Tasks.controllable<string>();

button.onclick = () => {
  controller.resolve('Button was clicked!');
};

// This will wait indefinitely until controller.resolve() or controller.reject() is called
const result = await task.promise;
console.log(result); // -> "Button was clicked!"
```

## License

MIT
