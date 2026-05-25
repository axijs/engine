import {isNullOrUndefined} from '@axijs/ensure';
import {SoundChannelConfig} from './sound-channel-config';
import {SoundChannel} from './sound-channel';
import {CoreSoundSequence} from './core-sound-sequence';
import {SoundSequence} from './sound-sequence';
import {SoundSequenceItem} from './types';
import {TimeContext} from '@axi-engine/utils';

export class CoreSoundChannel implements SoundChannel {
  // channel volume, from 0 to 1
  _volume: number = 1;

  // is need to loop play sound // default false
  loop: boolean;

  //
  maxInstances: number | undefined;

  sequences: Set<SoundSequence> = new Set<SoundSequence>();

  set volume(value: number) {
    this._volume = value;
    this.sequences.forEach(s => s.volumeFactor = this._volume);
  }

  get volume(): number {
    return this._volume;
  }

  constructor(config: SoundChannelConfig) {
    this.volume = isNullOrUndefined(config.volume) ? 1 : config.volume;
    this.loop = isNullOrUndefined(config.loop) ? false : config.loop;
    this.maxInstances = config.maxInstances;
  }

  update(time: TimeContext) {
    this.sequences.forEach(s => s.update(time));
  }

  play(sounds: SoundSequenceItem | SoundSequenceItem[], options?: any) {
    const seq = new CoreSoundSequence(sounds);
    this.sequences.add(seq);
    console.log('play:', sounds);

    seq.onFinish.once(() => {
      console.log('unsub and delete: ', this.sequences.size);
      this.sequences.delete(seq);
      console.log('after unsub and delete: ', this.sequences.size);
    });

    seq.play();
  }

  pause() {
    this.sequences.forEach(s => s.pause());
  }

  resume() {
    this.sequences.forEach(s => s.resume());
  }

  stop() {
    this.sequences.forEach(s => s.stop());
  }
}
