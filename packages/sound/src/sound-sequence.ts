// state of the track
import {TimeContext} from '@axi-engine/utils';
import {EasingParam, SoundSequenceItems, SoundSequenceState} from './types';
import {Emitter, StateEmitter} from '@axijs/emitter';


export interface SoundSequence {
  /** static volume of sequence */
  volume: number;

  /** volume factor from channel or other system */
  volumeFactor: number;

  /**  */
  readonly initialVolume: number;

  /** detailed state of sequence */
  readonly state: SoundSequenceState;

  /** is sequence pausing or paused */
  readonly paused: boolean;

  /** is sequence stopping or stopped */
  readonly stopped: boolean;

  readonly onFinish: Emitter<any[]>;

  readonly onState: StateEmitter<[SoundSequenceState]>;

  update(time: TimeContext): void;

  append(sounds: SoundSequenceItems): void;

  play(fadeIn?: EasingParam): void;

  pause(fadeOut?: EasingParam): void;

  resume(fadeIn?: EasingParam): void;

  stop(fadeOut?: EasingParam): void;
}
