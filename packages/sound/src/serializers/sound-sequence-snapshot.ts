import {TrackConfig} from '../track-config';

export interface SoundSequenceSnapshot {
  cursor: number;
  tracks: TrackConfig[];
  volume: number;
  paused: boolean;

}

