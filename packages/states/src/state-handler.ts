/**
 * Represents a lifecycle handler function for a state.
 * If a payload type `P` is provided and is not `void`, the handler receives the payload.
 * Supports both synchronous and asynchronous execution.
 *
 * @template P The type of the payload passed to the handler.
 */
export type StateHandler<P = void> =
  P extends void ?
    () => void | Promise<void>
    : (payload: P) => void | Promise<void>;


/**
 * Configuration object for defining a state's behavior and transition rules.
 *
 * @template T The type used for state identifiers.
 * @template P The type of the payload passed to the `onEnter` handler.
 */
export interface StateHandlerConfig<T, P = void> {
  /**
   * Hook executed when transitioning into this state.
   */
  onEnter?: StateHandler<P>;

  /**
   * Hook executed when transitioning out of this state.
   */
  onExit?: () => void | Promise<void>;

  /**
   * Optional list of states from which a transition to this state is permitted.
   * If undefined, the state can be entered from any state.
   */
  allowedFrom?: T[];
}

export type StateHandlerRegistration<T, P = void> = StateHandler<P> | StateHandlerConfig<T, P>;
