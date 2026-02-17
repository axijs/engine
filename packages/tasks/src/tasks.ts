import {AsyncTask, CompletableTask, TaskController} from './types';


/**
 * A frozen, pre-resolved task singleton to avoid unnecessary object creation.
 * @private
 */
const RESOLVED_TASK: CompletableTask = Object.freeze({
  promise: Promise.resolve(),
  complete: () => {
  }
});


/**
 * A utility object that provides factory methods for creating and composing asynchronous tasks.
 * These tasks are enhanced Promises that can be forcibly completed, making them ideal for
 * scripting animations, cutscenes, or any sequential logic that needs to be skippable.
 */
export const Tasks = {

  /**
   * @description Returns a pre-resolved, completed task. Useful as a synchronous no-op.
   * @returns {CompletableTask<void>} A task that is already complete.
   */
  resolved(): CompletableTask {
    return RESOLVED_TASK as CompletableTask;
  },

  /**
   * @description Creates a task that runs multiple tasks concurrently.
   * The parent task completes when all child tasks have completed.
   * Calling `complete` on the parent task will call `complete` on all its children.
   *
   * @todo
   * Improve typing to return an array of results from child tasks instead of void.
   *
   *
   * @param {CompletableTask<any>[]} tasks An array of tasks to run in parallel.
   * @returns {CompletableTask<void>} A new task that manages the parallel execution.
   *
   *
   */
  parallel<T extends CompletableTask<any>[]>(tasks: [...T]): CompletableTask {
    return {
      promise: (async () => {
        await Promise.all(tasks.map(task => task.promise));
      })(),
      complete: () => tasks.forEach(task => task.complete())
    }
  },

  /**
   * @description Creates a task that runs a sequence of tasks one after another.
   * Calling `complete` on the sequence will fast-forward it to its final state.
   * @template T The return type of the optional result task. Defaults to `void`.
   * @param {CompletableTask<any>[] | [...CompletableTask<any>[], CompletableTask<T>]} tasks An array of tasks to run in sequence.
   * @returns {CompletableTask<T>} A new task that manages the sequential execution.
   * It resolves with the result of `resTask` if provided, otherwise with `void`.
   */
  sequence<T = void>(tasks: CompletableTask<any>[] | [...CompletableTask<any>[], CompletableTask<T>]): CompletableTask<T> {
    let isSkipping = false;
    let currentIndex = -1;

    // Create a new array to prevent mutating the original.
    const allTasks: CompletableTask<any>[] = [...tasks];
    const complete = () => {
      if (isSkipping) {
        return;
      }
      isSkipping = true;
      if (currentIndex >= 0 && currentIndex < allTasks.length) {
        allTasks[currentIndex].complete();
      }
    };

    const executor = (async (): Promise<T> => {
      let finalResult: T;
      for (let i = 0; i < allTasks.length; i++) {
        currentIndex = i;
        const task = allTasks[i];

        if (isSkipping) {
          task.complete();
        }

        const promiseResult = await task.promise;
        if (i === allTasks.length - 1) {
          finalResult = promiseResult as T;
        }
      }
      return finalResult!;
    })

    return {
      promise: executor(),
      complete
    };
  },

  /**
   * @description Wraps a synchronous function in a task. If the function throws an error, the task's promise will be rejected.
   * @template T The return type of the synchronous function.
   * @param {() => T} syncFunction The synchronous function to execute.
   * @returns {CompletableTask<T>} A task that resolves with the function's return value.
   */
  sync<T>(syncFunction: () => T): CompletableTask<T> {
    try {
      const result = syncFunction();
      return {
        promise: Promise.resolve(result),
        complete: () => {
        },
      };
    } catch (error) {
      return {
        promise: Promise.reject(error),
        complete: () => {
        },
      };
    }
  },

  /**
   * @description Wraps a standard Promise into a `CompletableTask`.
   * The `complete` method is a no-op, as a native promise cannot be externally completed.
   * @template T The type of the promise's resolved value.
   * @param {Promise<T>} promise The promise to wrap.
   * @returns {CompletableTask<T>} A task wrapping the promise.
   */
  fromPromise<T>(promise: Promise<T>): CompletableTask<T> {
    return {
      promise,
      complete: () => {
      }
    }
  },

  /**
   * @description Creates a task that waits for a specified duration. This task can be completed or canceled.
   * @param {number} duration The time to wait in milliseconds.
   * @returns {AsyncTask<void>} A controllable task that resolves after the duration.
   */
  wait(duration: number): AsyncTask<void> {
    let timerId: number;
    let resolver: () => void;
    let rejecter: (reason?: any) => void;

    const promise = new Promise<void>((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
      /**
       * the double type casting for guarantee the timerId is right number type
       * It assures TypeScript that the value is compatible with `clearTimeout` in browser.
       * */
      timerId = setTimeout(resolve, duration) as unknown as number;
    });

    const complete = () => {
      clearTimeout(timerId);
      resolver();
    }

    const cancel = (reason = 'cancelled') => {
      clearTimeout(timerId);
      rejecter(reason);
    };

    return {
      promise,
      complete,
      cancel
    };
  },

  /**
   * @description Creates a task with externally accessible `resolve` and `reject` functions.
   * This is useful for tasks that are completed by external events (e.g., user input or a server response).
   * @template T The type of the value the promise will resolve with.
   * @returns {{ task: CompletableTask<T>, controller: TaskController<T>}}
   * An object containing the task and a controller to manage its state.
   */
  controllable<T>(defaultValueOnComplete?: T): { task: CompletableTask<T>, controller: TaskController<T> } {
    let resolver: (value: T) => void;
    let rejecter: (reason?: any) => void;

    const promise = new Promise<T>((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
    });

    const complete = () => {
      resolver(defaultValueOnComplete as T)
    };

    return {
      task: {promise, complete},
      controller: {resolve: resolver!, reject: rejecter!}
    };
  }
}
