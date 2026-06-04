import {CoreSoundSequence} from '../core-sound-sequence';
import {SoundSequenceSnapshot} from './sound-sequence-snapshot';

export class SoundSequenceSnapshotter {
  snapshot(sq: CoreSoundSequence) : SoundSequenceSnapshot  {
    /** question: do we need to return the tween dump? */
    return {
      cursor: sq.cursor,
      state: sq.state,
      loop: sq.loop,
      tracks: sq.tracks,
      volume: sq.initialVolume,
      volumeFactor: sq.volumeFactor,
      progress: sq.trackProgress,
    };
  }
}
