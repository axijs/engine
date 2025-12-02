# StateMachine

A lightweight, type-safe, and easy-to-use state machine 
designed for managing game logic and component states
within the Axi Engine.

This implementation prioritizes simplicity, 
a clean API, and robust error handling for common use cases. 
It is perfect for managing character states, 
UI flows, game session lifecycles, and more. 
It has minimal dependencies, relying only on the `Emitter` 
utility from `@axi-engine/utils` for its event system.

For highly complex scenarios involving hierarchical (nested) states, 
parallel states, or state history, 
I recommend considering more powerful, 
dedicated libraries like [XState](https://xstate.js.org/). 

My goal is to provide a solid, built-in tool that covers 80% of typical game development needs 
without adding external dependencies or unnecessary complexity.

## Features

-   **Simple and Clean API:** Registering states and transitioning between them is straightforward.
-   **Type-Safe:** Leverages TypeScript generics to provide type safety for state names and event payloads.
-   **Lifecycle Hooks:** States can have `onEnter` and `onExit` handlers for setup and cleanup logic.
-   **Transition Guards:** You can define which states are allowed to transition to a new state, preventing logical errors.
-   **Observable State:** A public `onChange` emitter allows you to subscribe to all state transitions for debugging, logging, or reacting to changes.
-   **Minimal Dependencies:** Relies only on a tiny, self-contained `Emitter` utility.

## Getting Started

First, define the possible states, typically using an `enum` for type safety.

```typescript
enum GameState {
  MainMenu,
  Loading,
  Playing,
  Paused,
  GameOver,
}
```

Then, create an instance of the `StateMachine`. The machine starts in an `undefined` state.

```typescript
import { StateMachine } from './@axi-engine/states';

const gameState = new StateMachine<GameState>();
```

## API and Usage

### 1. Registering States

You can register a state with a simple handler function. This function will be treated as the `onEnter` hook.

```typescript
// Simple registration
gameState.register(GameState.MainMenu, () => {
  console.log('Welcome to the Main Menu!');
  showMainMenu();
});

gameState.register(GameState.GameOver, () => {
  console.log('Game Over!');
  showGameOverScreen();
});
```

### 2. Changing States

Use the `call` method to transition to a new state. The method is asynchronous to handle any `async` logic within state handlers. The first call will formally start the machine.

```typescript
// Start the machine by calling the initial state
await gameState.call(GameState.MainMenu);

// ... later in the game
await gameState.call(GameState.GameOver);
```

### 3. Using Payloads

You can pass data during a state transition. The payload type can be defined in the `StateMachine` generic.

```typescript
// State machine that accepts a string payload for the 'Loading' state
const sm = new StateMachine<GameState, string>();

sm.register(GameState.Loading, async (levelId: string) => {
  console.log(`Loading level: ${levelId}...`);
  await loadLevelAssets(levelId);
});

await sm.call(GameState.Loading, 'level-2');
```

### 4. Advanced Registration

For more control, you can register a state with a configuration object. This allows you to define `onEnter`, `onExit` hooks, and transition guards.

#### `onEnter` and `onExit`

-   `onEnter`: Called when the machine enters the state.
-   `onExit`: Called when the machine leaves the state. This is perfect for cleanup.

```typescript
gameState.register(GameState.Playing, {
  onEnter: () => {
    console.log('Starting game...');
    gameMusic.play();
    player.enableControls();
  },
  onExit: () => {
    console.log('Exiting gameplay...');
    gameMusic.stop();
    player.disableControls();
  },
});
```

#### `allowedFrom` (Transition Guards)

Specify an array of states from which a transition to this state is permitted. An attempt to transition from any other state will throw an error.

```typescript
gameState.register(GameState.Paused, {
  // You can only pause the game if you are currently playing.
  allowedFrom: [GameState.Playing],
  onEnter: () => {
    console.log('Game paused.');
    showPauseMenu();
  },
});

// This will work:
await gameState.call(GameState.Playing);
await gameState.call(GameState.Paused);

// This will throw an error:
await gameState.call(GameState.MainMenu);
await gameState.call(GameState.Paused); // Error: Transition from MainMenu to Paused is not allowed.
```

### 5. Subscribing to Changes

The public `onChange` property is an `Emitter`. You can use its `subscribe` method to be notified of any state change. The method returns a function to unsubscribe.

```typescript
const unsubscribe = gameState.onChange.subscribe((from, to, payload) => {
  const fromState = from !== undefined ? GameState[from] : 'Start';
  console.log(`State changed from ${fromState} to ${GameState[to]}`, { payload });
});

await gameState.call(GameState.MainMenu);
// Console output: State changed from Start to MainMenu

// To stop listening later:
unsubscribe();
```

## Full Example

```typescript
import { StateMachine } from '@axi-engine/states';

enum GameState {
  MainMenu,
  Playing,
  Paused,
  GameOver,
}

// --- Setup ---
const game = new StateMachine<GameState>();

game.onChange.subscribe((from, to) => {
  const fromState = from !== undefined ? GameState[from] : 'Start';
  console.log(`[SYSTEM] Transition: ${fromState} -> ${GameState[to]}`);
});

game.register(GameState.MainMenu, {
  onEnter: () => console.log('Showing Main Menu.'),
});

game.register(GameState.Playing, {
  allowedFrom: [GameState.MainMenu, GameState.Paused],
  onEnter: () => console.log('Game has started! Player controls enabled.'),
  onExit: () => console.log('Player controls disabled.'),
});

game.register(GameState.Paused, {
  allowedFrom: [GameState.Playing],
  onEnter: () => console.log('Game is paused.'),
});

game.register(GameState.GameOver, {
  allowedFrom: [GameState.Playing],
  onEnter: () => console.log('You lose!'),
});

// --- Simulation ---
async function runGame() {
  await game.call(GameState.MainMenu);
  // [SYSTEM] Transition: Start -> MainMenu
  // Showing Main Menu.

  await game.call(GameState.Playing);
  // [SYSTEM] Transition: MainMenu -> Playing
  // Game has started! Player controls enabled.

  await game.call(GameState.Paused);
  // [SYSTEM] Transition: Playing -> Paused
  // Player controls disabled.
  // Game is paused.

  try {
    // This transition will fail because of the 'allowedFrom' guard
    await game.call(GameState.MainMenu);
  } catch (e) {
    console.error(e.message); // Error: Transition from Paused to MainMenu is not allowed.
  }
}

runGame();
```
