// state of the track
import {TimeContext} from '@axi-engine/utils';
import {EasingParam, SoundSequenceItems, SoundSequenceState} from './types';
import {Emitter, StateEmitter} from '@axijs/emitter';

/**
 * Atomic, base representation of a single sound or a sequence of sounds.
 * Sequences are reusable and can be replayed after stopping.
 */
export interface SoundSequence {
  /** Current volume of the sequence (0.0 to 1.0). */
  volume: number;

  /** Volume multiplier applied by parent systems (e.g., channels). */
  volumeFactor: number;

  /** The base volume before any tween animations are applied. */
  readonly initialVolume: number;

  /** Current detailed state of the sequence. */
  readonly state: SoundSequenceState;

  /** Indicates if the sequence is currently paused or transitioning to a paused state. */
  readonly paused: boolean;

  /** Indicates if the sequence is fully stopped or transitioning to a stopped state. */
  readonly stopped: boolean;

  /** Triggered when the sequence start playing. */
  readonly onPlay: Emitter<void[]>;

  /** Triggered when the sequence completes playing all tracks (in loop === false only) or has been stopped. */
  readonly onFinish: Emitter<void[]>;

  /** Triggered whenever the state of the sequence changes. */
  readonly onState: StateEmitter<[SoundSequenceState]>;

  /**
   * Updates internal tweens and timers.
   * @param time Context containing time delta from the game loop.
   */
  update(time: TimeContext): void;

  /**
   * Adds new sounds to the end of the sequence.
   * @param sounds Items to append.
   */
  append(sounds: SoundSequenceItems): void;

  /**
   * Starts or restarts the sequence.
   * @param fadeIn Optional fade-in duration or easing configuration.
   */
  play(fadeIn?: EasingParam): void;

  /**
   * Pauses the sequence.
   * @param fadeOut Optional fade-out duration or easing configuration.
   */
  pause(fadeOut?: EasingParam): void;

  /**
   * Resumes a paused sequence.
   * @param fadeIn Optional fade-in duration or easing configuration.
   */
  resume(fadeIn?: EasingParam): void;

  /**
   * Stops the sequence.
   * @param fadeOut Optional fade-out duration or easing configuration.
   */
  stop(fadeOut?: EasingParam): void;
}
