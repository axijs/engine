import {TrackConfig} from '../track-config';
import {SoundSequenceState} from '../types';

export interface SoundSequenceSnapshot {
  cursor: number;
  progress: number | undefined;

  state: SoundSequenceState;
  loop: boolean;
  tracks: TrackConfig[];
  volume: number;
  volumeFactor: number;
}

