// state of the track
import {TimeContext} from '@axi-engine/utils';
import {EasingParam, SoundSequenceItems} from './types';


export interface SoundSequence {
  volume: number;
  volumeFactor: number;

  update(time: TimeContext): void;

  play(easing?: EasingParam): void;

  append(sounds: SoundSequenceItems): void;

  pause(easing?: EasingParam): void;

  resume(easing?: EasingParam): void;

  stop(easing?: EasingParam): void;
}
