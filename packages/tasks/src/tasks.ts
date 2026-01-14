import {AsyncTask, CompletableTask} from './types';


/**
 * to prevent creating empty task each time on resolved() call we will use this RESOLVED_TASK singleton
 *
 */
const RESOLVED_TASK: CompletableTask<void> = Object.freeze({
  promise: Promise.resolve(),
  complete: () => {
  }
});

export const Tasks = {

  /**
   * to use when need an empty sync task, instead of call sync<void>(() => {})
   */
  resolved(): CompletableTask {
    return RESOLVED_TASK as CompletableTask;
  },

  /**
   */
  parallel(tasks: CompletableTask<any>[]): CompletableTask {
    return {
      promise: (async () => {
        await Promise.all(tasks.map(task => task.promise));
      })(),
      complete: () => tasks.forEach(task => task.complete())
    }
  },

  /** execute one by one */
  sequence<T extends void = void>(tasks: CompletableTask[], resTask?: CompletableTask<T>): CompletableTask<T> {
    let isSkipping = false;
    let currentIndex = -1;
    // Create a new array for preventing of mutating the original.
    const allTasks = [...tasks];
    if (resTask) {
      allTasks.push(resTask);
    }

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
      return finalResult;
    })

    return {
      promise: executor(),
      complete
    };
  },

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

  fromPromise<T>(promise: Promise<T>): CompletableTask<T> {
    return {
      promise,
      complete: () => {
      }
    }
  },

  /*
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
   * create promise that can be controlled outside
   */
  controllable<T>() {
    let resolver: (value: T) => void;
    let rejecter: (reason?: any) => void;

    const promise = new Promise<T>((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
    });

    const complete = () => {
      resolver(undefined as T)
    };

    return {
      task: {promise, complete},
      controller: {resolve: resolver!, reject: rejecter!}
    };
  }
}
