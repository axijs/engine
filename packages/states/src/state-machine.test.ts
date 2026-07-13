import {describe, it, expect, vi} from 'vitest';
import {StateMachine} from './state-machine';

const enum StringState {
  idle = 'idle',
  running = 'running'
}

const enum NumericState {
  idle,
  running
}

describe('StateMachine - Registration & Transitions', () => {
  it('should have undefined state initially', () => {
    const fsm = new StateMachine<StringState>();
    expect(fsm.state).toBeUndefined();
  });

  it('should register a state with a simple function and transition to it', async () => {
    const fsm = new StateMachine<StringState>();
    const onEnterSpy = vi.fn();

    fsm.register(StringState.idle, onEnterSpy);

    await fsm.call(StringState.idle);

    expect(fsm.state).toBe(StringState.idle);
    expect(onEnterSpy).toHaveBeenCalledOnce();
  });

  it('should register a state with a config object', async () => {
    const fsm = new StateMachine<StringState>();
    const onEnterSpy = vi.fn();
    const onExitSpy = vi.fn();

    fsm.register(StringState.running, {
      onEnter: onEnterSpy,
      onExit: onExitSpy
    });

    await fsm.call(StringState.running);

    expect(fsm.state).toBe(StringState.running);
    expect(onEnterSpy).toHaveBeenCalledOnce();
    expect(onExitSpy).not.toHaveBeenCalled();
  });

  it('should trigger onExit of the old state and onEnter of the new state during transition', async () => {
    const fsm = new StateMachine<StringState>();
    const exitIdleSpy = vi.fn();
    const enterRunningSpy = vi.fn();

    fsm.register(StringState.idle, {onExit: exitIdleSpy});
    fsm.register(StringState.running, {onEnter: enterRunningSpy});

    await fsm.call(StringState.idle);
    await fsm.call(StringState.running);

    expect(fsm.state).toBe(StringState.running);
    expect(exitIdleSpy).toHaveBeenCalledOnce();
    expect(enterRunningSpy).toHaveBeenCalledOnce();
  });

  it('should pass payload to onEnter and onChange event', async () => {
    type Payload = { speed: number };
    const fsm = new StateMachine<StringState, Payload>();

    const enterSpy = vi.fn();
    const changeSpy = vi.fn();

    fsm.register(StringState.running, enterSpy);
    fsm.onChange.subscribe(changeSpy);

    const payload = {speed: 10};
    await fsm.call(StringState.running, payload);

    expect(enterSpy).toHaveBeenCalledWith(payload);
    expect(changeSpy).toHaveBeenCalledWith({from: undefined, to: StringState.running, payload});
  });
});

describe('StateMachine - Falsy vs Truthy State Identifiers', () => {
  it('should trigger onExit when transitioning FROM a numeric state that equals 0 (falsy)', async () => {
    const fsm = new StateMachine<NumericState>();
    const exitIdleSpy = vi.fn();
    const enterRunningSpy = vi.fn();

    fsm.register(NumericState.idle, {onExit: exitIdleSpy});
    fsm.register(NumericState.running, {onEnter: enterRunningSpy});

    await fsm.call(NumericState.idle);
    await fsm.call(NumericState.running);

    expect(fsm.state).toBe(NumericState.running);
    expect(exitIdleSpy).toHaveBeenCalledOnce();
    expect(enterRunningSpy).toHaveBeenCalledOnce();
  });
});
