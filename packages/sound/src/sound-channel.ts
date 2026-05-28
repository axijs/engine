import {EasingParam, SoundSequenceItem} from './types';
import {TimeContext} from '@axi-engine/utils';
import {SoundSequenceOptions} from './sound-sequence-options';

export interface SoundChannel {
  /**
   * @default 1
   */
  volume: number;

  /** is need to loop play sound,
   * @default false
   */
  loop: boolean;

  /**
   * @default undefined
   */
  maxInstances: number | undefined;

  update(time: TimeContext): void;

  play(
    sounds: SoundSequenceItem | SoundSequenceItem[],
    options?: { sequence?: SoundSequenceOptions, easing?: EasingParam}
  ): void;

  pause(easing?: EasingParam): void;

  resume(easing?: EasingParam): void;

  stop(easing?: EasingParam): void;
}
