## Easing Registry

### About:

A lightweight, type-safe registry of mathematical easing functions.

### Why it's needed:

Provides smooth interpolation for time-dependent transformations, such as audio fade-ins/fade-outs,
sprite animations, and transitions.

### Components:

* `EasingFunction`: Base type for easing algorithms `(t: number) => number`.
* `RegisteredEasings`: Interface for strict typing of available easings.
* `easings`: The runtime `Registry` instance storing the functions.

**How to extend:**  
You can add custom easing functions with full TypeScript support
via declaration merging:

```typescript
// 1. Extend the typings
declare module '@axi-engine/utils' {
  interface RegisteredEasings {
    customBounce: EasingFunction;
  }
}

// 2. Register the logic
import {easings} from '@axi-engine/utils';

easings.register('customBounce', t => {
  // mathematical logic here
  return t;
});
```

