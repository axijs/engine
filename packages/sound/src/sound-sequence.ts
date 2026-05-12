// state of the track
import {TimeContext} from '@axi-engine/utils';
import {SoundSequenceItems} from './types';


export interface SoundSequence {
  volume: number;
  volumeFactor: number;

  update(time: TimeContext): void;

  play(): void;

  append(sounds: SoundSequenceItems): void;

  pause(): void;

  resume(): void;

  stop(): void;
}
