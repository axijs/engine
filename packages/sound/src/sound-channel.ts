import {EasingParam, SoundChannelPlayOptions, SoundSequenceItems} from './types';
import {TimeContext} from '@axi-engine/utils';


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

  play(sounds: SoundSequenceItems, options?: SoundChannelPlayOptions): void;

  pause(easing?: EasingParam): void;

  resume(easing?: EasingParam): void;

  stop(easing?: EasingParam): void;
}
