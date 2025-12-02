import {StateHandlerConfig, StateHandlerRegistration} from "./state-handler";
import {Emitter, isNullOrUndefined, isUndefined, throwIf, throwIfEmpty} from '@axi-engine/utils';


/**
 * A minimal, type-safe finite state machine.
 * It manages states, transitions, and associated lifecycle hooks (`onEnter`, `onExit`).
 *
 * @template T The type used for state identifiers (e.g., a string or an enum).
 * @template P The default payload type for state handlers. Can be overridden per state.
 * @example
 * enum PlayerState { Idle, Walk, Run }
 *
 * const playerFsm = new StateMachine<PlayerState>();
 *
 * playerFsm.register(PlayerState.Idle, () => console.log('Player is now idle.'));
 * playerFsm.register(PlayerState.Walk, () => console.log('Player is walking.'));
 *
 * async function start() {
 *   await playerFsm.call(PlayerState.Idle);
 *   await playerFsm.call(PlayerState.Walk);
 * }
 */
export class StateMachine<T, P = void> {
  /**
   * @protected
   * The internal representation of the current state.
   */
  protected _state?: T;

  /**
   * @protected
   * A map storing all registered state configurations.
   */
  protected states: Map<T, StateHandlerConfig<T, P> | undefined> = new Map();

  /**
   * Public emitter that fires an event whenever the state changes.
   * The event provides the old state, the new state, and the payload.
   * @see Emitter
   * @example
   * fsm.onChange.subscribe((from, to, payload) => {
   *   console.log(`State transitioned from ${from} to ${to}`);
   * });
   */
  readonly onChange = new Emitter<[from?: T, to?: T, payload?: P]>();

  /**
   * Gets the current state of the machine.
   * @returns The current state identifier, or `undefined` if the machine has not been started.
   */
  get state(): T | undefined {
    return this._state;
  }

  /**
   * Registers a state and its associated handler or configuration.
   * If a handler is already registered for the given state, it will be overwritten.
   *
   * @param state The identifier for the state to register.
   * @param handler A handler function (`onEnter`) or a full configuration object.
   * @example
   * // Simple registration
   * fsm.register(MyState.Idle, () => console.log('Entering Idle'));
   *
   * // Advanced registration
   * fsm.register(MyState.Walking, {
   *   onEnter: () => console.log('Start walking animation'),
   *   onExit: () => console.log('Stop walking animation'),
   *   allowedFrom: [MyState.Idle]
   * });
   */
  register(state: T, handler?: StateHandlerRegistration<T, P>): void {
    if (isUndefined(handler) || typeof handler === 'function') {
      this.states.set(state, {onEnter: handler});
    } else {
      this.states.set(state, handler);
    }
  }

  /**
   * Transitions the machine to a new state.
   * This method is asynchronous to accommodate async `onEnter` and `onExit` handlers.
   * It will execute the `onExit` handler of the old state, then the `onEnter` handler of the new state.
   *
   * @param newState The identifier of the state to transition to.
   * @param payload An optional payload to pass to the new state's `onEnter` handler.
   * @returns A promise that resolves when the transition is complete.
   * @throws {Error} if the `newState` has not been registered.
   * @throws {Error} if the transition from the current state to the `newState` is not allowed by the `allowedFrom` rule.
   * @example
   * try {
   *   await fsm.call(PlayerState.Run, { speed: 10 });
   * } catch (e) {
   *   console.error('State transition failed:', e.message);
   * }
   */
  async call(newState: T, payload?: P): Promise<void> {
    const oldState = this._state;
    const oldStateConfig = this._state ? this.states.get(this._state) : undefined;
    const newStateConfig = this.states.get(newState);

    throwIfEmpty(newStateConfig, `State ${String(newState)} is not registered.`);

    throwIf(
      !isNullOrUndefined(newStateConfig.allowedFrom) &&
      !isNullOrUndefined(oldState) &&
      !newStateConfig.allowedFrom.includes(oldState),
      `Transition from ${String(oldState)} to ${String(newState)} is not allowed.`
    );

    await oldStateConfig?.onExit?.();

    this._state = newState;

    await (newStateConfig.onEnter as (payload?: P) => void | Promise<void>)?.(payload);

    this.onChange.emit(oldState, newState, payload);
  }

  /**
   * Removes a single state configuration from the machine.
   * If the removed state is the currently active one, the machine's state will be reset to `undefined`.
   *
   * @param state The identifier of the state to remove.
   * @returns `true` if the state was found and removed, otherwise `false`.
   * @example
   * fsm.register(MyState.Temp, () => {});
   * // ...
   * const wasRemoved = fsm.unregister(MyState.Temp);
   * console.log('Temporary state removed:', wasRemoved);
   */
  unregister(state: T): boolean {
    if (this._state === state) {
      this._state = undefined;
    }
    return this.states.delete(state);
  }

  /**
   * Removes all registered states and resets the machine to its initial, undefined state.
   * This does not clear `onChange` subscribers.
   * @example
   * fsm.register(MyState.One);
   * fsm.register(MyState.Two);
   * // ...
   * fsm.clear(); // The machine is now empty.
   */
  clear(): void {
    this.states.clear();
    this._state = undefined;
  }
}

