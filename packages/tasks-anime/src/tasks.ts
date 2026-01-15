import {CompletableTask, Tasks as CoreTasks} from '@axi-engine/tasks';
import {animate, AnimationParams, JSAnimation, TargetsParam} from 'animejs';

/**
 * An extended version of the core `Tasks` utility from `@axi-engine/tasks`.
 * This object includes all the base task creators, plus additional methods
 * for integrating with the `anime.js` animation library.
 */
export const Tasks = {
  ...CoreTasks,

  /**
   * @description Wraps an existing `anime.js` animation instance into a `CompletableTask`.
   * This allows `anime.js` animations to be used within task sequences.
   * @param {JSAnimation} anim The `anime.js` animation instance to wrap.
   * @returns {CompletableTask<void>} A new task that completes when the animation finishes.
   */
  fromAnimate(anim: JSAnimation): CompletableTask {
    return {
      promise: anim.then(),
      complete: () => {
        if (!anim.completed) {
          anim.complete();
        }
      }
    }
  },

  /**
   * @description A factory function that creates an `anime.js` animation and immediately wraps it in a `CompletableTask`.
   * @param {TargetsParam} targets The target(s) for the `anime.js` animation.
   * @param {AnimationParams} parameters The parameters for the `anime.js` animation.
   * @returns {CompletableTask<void>} A new task that controls the created animation.
   */
  animate(targets: TargetsParam, parameters: AnimationParams): CompletableTask {
    return this.fromAnimate(animate(targets, parameters));
  }

}
