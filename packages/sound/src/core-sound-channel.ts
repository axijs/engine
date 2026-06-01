import {isNullOrUndefined} from '@axijs/ensure';
import {StateEmitter} from '@axijs/emitter';
import {TimeContext} from '@axi-engine/utils';
import {SoundChannelConfig} from './sound-channel-config';
import {SoundChannel} from './sound-channel';
import {CoreSoundSequence} from './core-sound-sequence';
import {SoundSequence} from './sound-sequence';
import {EasingParam, SoundChannelPlayOptions, SoundSequenceItems} from './types';
import {SoundSequenceOptions} from './sound-sequence-options';


export class CoreSoundChannel implements SoundChannel {
  // channel volume, from 0 to 1
  private _volume = 1;

  // is need to loop play sound // default false
  private _loop = false;

  //
  private _maxInstances: number | undefined;

  sequences: Set<SoundSequence> = new Set<SoundSequence>();

  onSizeChanged = new StateEmitter<[number]>([0]);
  onVolumeChanged = new StateEmitter<[number]>([this._volume]);

  set volume(value: number) {
    this._volume = value;
    this.sequences.forEach(s => s.volumeFactor = this._volume);
    this.onVolumeChanged.emit(this._volume);
  }

  get volume(): number {
    return this._volume;
  }

  set loop(val: boolean) {
    this._loop = val;
  }

  get loop() {
    return this._loop;
  }

  set maxInstances(val: number | undefined) {
    this._maxInstances = val;
  }

  get maxInstances() {
    return this._maxInstances;
  }

  constructor(config: SoundChannelConfig) {
    this.volume = isNullOrUndefined(config.volume) ? 1 : config.volume;
    this.loop = isNullOrUndefined(config.loop) ? false : config.loop;
    this.maxInstances = config.maxInstances;
  }

  update(time: TimeContext) {
    this.sequences.forEach(s => s.update(time));
  }

  play(
    sounds: SoundSequenceItems,
    options?: SoundChannelPlayOptions
  ) {
    if (!isNullOrUndefined(this._maxInstances) && this.sequences.size + 1 > this._maxInstances) {
      this.sequences.values().next().value?.stop();
    }

    const seqOptions: SoundSequenceOptions = {
      volumeFactor: this._volume,
      loop: this._loop,
      ...options
    };

    const seq = new CoreSoundSequence(sounds, seqOptions);
    this.sequences.add(seq);
    this.onSizeChanged.emit(this.sequences.size);

    seq.onFinish.once(() => {
      this.sequences.delete(seq);
      this.onSizeChanged.emit(this.sequences.size);
    });

    seq.play(options?.fadeIn);
  }

  pause(easing?: EasingParam) {
    this.sequences.forEach(s => s.pause(easing));
  }

  resume(easing?: EasingParam) {
    this.sequences.forEach(s => s.resume(easing));
  }

  stop(easing?: EasingParam) {
    this.sequences.forEach(s => s.stop(easing));
  }
}
