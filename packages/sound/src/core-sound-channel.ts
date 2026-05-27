import {isNullOrUndefined} from '@axijs/ensure';
import {TimeContext} from '@axi-engine/utils';
import {SoundChannelConfig} from './sound-channel-config';
import {SoundChannel} from './sound-channel';
import {CoreSoundSequence} from './core-sound-sequence';
import {SoundSequence} from './sound-sequence';
import {SoundSequenceItem} from './types';
import {StateEmitter} from '@axijs/emitter';


export class CoreSoundChannel implements SoundChannel {
  // channel volume, from 0 to 1
  _volume: number = 1;

  // is need to loop play sound // default false
  loop: boolean;

  //
  maxInstances: number | undefined;

  sequences: Set<SoundSequence> = new Set<SoundSequence>();

  onSizeChanged = new StateEmitter<[number]>([0]);
  onVolumeChanged  = new StateEmitter<[number]>([this._volume]);

  set volume(value: number) {
    this._volume = value;
    this.sequences.forEach(s => s.volumeFactor = this._volume);
    this.onVolumeChanged.emit(this._volume);
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
    console.log('play: ', sounds);
    const seq = new CoreSoundSequence(sounds);
    this.sequences.add(seq);
    this.onSizeChanged.emit(this.sequences.size);

    console.log('play:', sounds);

    seq.onFinish.once(() => {
      console.log('unsub and delete: ', this.sequences.size);
      this.sequences.delete(seq);
      this.onSizeChanged.emit(this.sequences.size);
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
