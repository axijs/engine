# @axi-engine/tasks-anime

![alt text](https://img.shields.io/npm/v/@axi-engine/tasks-anime.svg)


The official anime.js adapter for @axi-engine/tasks.

This package extends the core Tasks utility, adding factory methods 
to create skippable animation tasks using anime.js.

## Installation

You need to install the core tasks library, this adapter, and animejs.

```bash
npm install @axi-engine/tasks @axi-engine/tasks-anime animejs
```

## Usage

Import Tasks from this package instead of the core library. 
You will get all the base methods (sequence, wait, etc.) plus the new animation methods.

```TypeScript

import { Tasks } from '@axi-engine/tasks-anime';

// Create a skippable animation
const moveBox = Tasks.animate({
targets: '.box',
translateX: 250,
duration: 2000
});

// To skip the animation at any time, just call .complete()
// This will instantly move the box to its final position.
// button.onclick = () => moveBox.complete();
```

## License

MIT
