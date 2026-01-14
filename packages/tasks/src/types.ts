/**
 * Defines an object that represents an operation that can be forcibly completed.
 */
export interface Completable {
  /**
   * Immediately finishes the associated asynchronous operation.
   * This typically involves skipping any remaining animations or delays.
   * The associated promise should resolve successfully.
   */
  complete: () => void;
}

/**
 * Defines an object that represents an operation that can be canceled.
 */
export interface Cancelable {

  /**
   * Aborts the associated asynchronous operation.
   * The associated promise should be rejected with the provided reason.
   * @param reason An optional reason for the cancellation.
   */
  cancel: (reason?: any) => void;
}

/**
* Represents an asynchronous operation that includes a Promise
* and can be forcibly completed.
* @template T The type of the value that the promise will resolve with.
*/
export interface CompletableTask<T = void> extends Completable {
  promise: Promise<T>;
}

/**
 * Represents an asynchronous operation that includes a Promise
 * and can be canceled.
 * @template T The type of the value that the promise will resolve with.
 */
export interface CancellableTask<T = void> extends Cancelable {
  promise: Promise<T>
}

/**
 * Represents a fully-featured asynchronous operation that can be
 * both completed and canceled.
 * This is the most common task type, providing maximum control.
 * @template T The type of the value that the promise will resolve with.
 */
export interface AsyncTask<T = void> extends CancellableTask<T>, CompletableTask<T> {
}

