import {Emitter} from './emitter';
import {isUndefined} from '../guards';
import {Subscription} from '../subscription';

/**
 * An Emitter that stores the last emitted value.
 * New subscribers immediately receive the last value upon subscription.
 */
export class StateEmitter<T extends any[]> extends Emitter<T> {
  private _lastValue: T | undefined;

  /**
   * @param initialValue Optional initial value to set.
   */
  constructor(initialValue?: T) {
    super();
    this._lastValue = initialValue ?? undefined;
  }

  /**
   * Gets the current value synchronously without subscribing.
   */
  get value(): T | undefined {
    return this._lastValue;
  }

  /**
   * Updates the state and notifies all listeners.
   * @param args The new value(s).
   */
  override emit(...args: T): void {
    this._lastValue = args;
    super.emit(...args);
  }

  /**
   * Subscribes to the event. If a value exists, the listener is called immediately.
   * @param listener The callback function.
   * @returns A Subscription object.
   */
  override subscribe(listener: (...args: T) => void): Subscription {
    const unsubscribe = super.subscribe(listener);

    if (!isUndefined(this._lastValue)) {
      listener(...this._lastValue);
    }

    return unsubscribe;
  }

  override clear() {
    super.clear();
    this._lastValue = undefined;
  }
}
