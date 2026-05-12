import {SoundSequenceItem} from './types';

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

  play(sounds: SoundSequenceItem | SoundSequenceItem[], options?: any): void;

  pause(): void;

  resume(): void;

  stop(): void;
}
