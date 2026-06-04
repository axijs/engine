import {SoundSequenceSnapshot} from './sound-sequence-snapshot';
import {CoreSoundSequence} from '../core-sound-sequence';


export class SoundSequenceHydrator {
  hydrate(snapshot: SoundSequenceSnapshot) {
    return new CoreSoundSequence(snapshot.tracks, {
      cursor: snapshot.cursor,
      progress: snapshot.progress,
      volume: snapshot.volume,
      volumeFactor: snapshot.volumeFactor,
      loop: snapshot.loop,
      state: snapshot.state
    });
  }
}

