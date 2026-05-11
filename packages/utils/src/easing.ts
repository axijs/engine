import {Registry} from './registry';

/**
 * @module EasingRegistry
 *
 * A lightweight, type-safe registry of mathematical easing functions.
 * Provides smooth interpolation for time-dependent transformations.
 */

 /**
 * Mathematical function for easing transitions.
 * @param t - Normalized time value between 0 and 1.
 * @returns Eased value.
 */
export type EasingFunction = (t: number) => number;

/**
 * Interface containing all registered easing functions.
 * Use TypeScript declaration merging to add custom easings.
 * @see https://easings.net/
 */
export interface RegisteredEasings {
  linear: EasingFunction;
  easeInSine: EasingFunction;
  easeOutSine: EasingFunction;
  easeInOutSine: EasingFunction;
  easeInQuad: EasingFunction;
  easeOutQuad: EasingFunction;
  easeInOutQuad: EasingFunction;
}

/**
 * Union type of all available easing function names.
 */
export type EasingName = keyof RegisteredEasings;


/**
 * Registry holding the implementations of easing functions.
 */
export const easings = new Registry<EasingName, EasingFunction>();

const PI = Math.PI;

easings.register('linear', t => t);
easings.register('easeInSine', t => 1 - Math.cos((t * PI) / 2));
easings.register('easeOutSine', t => Math.sin((t * PI) / 2));
easings.register('easeInOutSine', t => -(Math.cos(PI * t) - 1) / 2);
easings.register('easeInQuad', t => t * t);
easings.register('easeOutQuad', t => t * (2 - t));
easings.register('easeInOutQuad', t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

