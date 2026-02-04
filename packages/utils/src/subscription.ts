import {Unsubscribable} from './types';
import {isFunction} from './guards';


/**
 * Represents a disposable resource, such as the execution of an Observable or an Event Listener.
 * Allows grouping multiple teardown logic into a single unit (Composite Subscription).
 */
export class Subscription implements Unsubscribable {
  private _closed = false;
  private _teardowns: (() => void)[] = [];

  /**
   * Indicates whether this subscription has already been unsubscribed.
   */
  get closed(): boolean {
    return this._closed;
  }

  /**
   * @param teardown Optional initial teardown logic to execute when unsubscribed.
   */
  constructor(teardown?: () => void) {
    if (teardown) {
      this._teardowns.push(teardown);
    }
  }

  /**
   * Adds a teardown logic to this subscription.
   * If the subscription is already closed, the teardown is executed immediately.
   * @param teardown A function or another Unsubscribable object to be managed.
   */
  add(teardown: Unsubscribable | (() => void)): void {
    if (this._closed) {
      isFunction(teardown) ? teardown() : teardown.unsubscribe();
      return;
    }
    this._teardowns.push(isFunction(teardown) ? teardown : () => teardown.unsubscribe());
  }

  /**
   * Disposes the resources held by the subscription.
   * Executes all attached teardown logic and clears the list.
   */
  unsubscribe(): void {
    if (this._closed) return;
    this._closed = true;
    this._teardowns.forEach(fn => fn());
    this._teardowns = [];
  }
}
