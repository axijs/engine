export type StateHandler<P = void> =
  P extends void ?
    () => void | Promise<void>
    : (payload: P) => void | Promise<void>;


export interface StateHandlerConfig<T, P = void> {
  onEnter?: StateHandler<P>;
  onExit?: () => void | Promise<void>;
  allowedFrom?: T[];
}

export type StateHandlerRegistration<T, P = void> = StateHandler<P> | StateHandlerConfig<T, P>;
