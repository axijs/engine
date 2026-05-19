// state of the track
import {TimeContext} from '@axi-engine/utils';
import {EasingParam, SoundSequenceItems} from './types';


export interface SoundSequence {
  /** static volume of sequence */
  volume: number;

  /** volume factor from channel or other system */
  volumeFactor: number;

  update(time: TimeContext): void;

  append(sounds: SoundSequenceItems): void;

  play(fadeIn?: EasingParam): void;

  pause(fadeOut?: EasingParam): void;

  resume(fadeIn?: EasingParam): void;

  stop(fadeOut?: EasingParam): void;
}
