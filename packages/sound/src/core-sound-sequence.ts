import {isNullOrUndefined, isPromise, isString, isUndefined, throwIf} from '@axijs/ensure';
import {IMediaInstance, sound} from '@pixi/sound';
import {Emitter} from '@axijs/emitter';
import {SoundSequence} from './sound-sequence';
import {SoundSequenceOptions} from './sound-sequence-options';
import {TrackConfig} from './track-config';
import {SoundSequenceItems} from './types';
import {TimeContext} from '@axi-engine/utils';


export class CoreSoundSequence implements SoundSequence {

  private _closed = false; // true when sequence fully finished or has been stopped
  private _volume = 1;
  private _volumeFactor = 1;
  private _paused = false;
  private _loop = false;

  private cursorStart = -1;
  private cursor = this.cursorStart;
  private sequence: TrackConfig[];

  private activeInstance: IMediaInstance | undefined;

  readonly onFinish = new Emitter();

  get paused() {
    return this._paused;
  }

  set loop(val: boolean) {
    this._loop = val;
    this.updateActiveInstanceLoop();
  }

  get loop() {
    return this._loop;
  }

  set volume(val: number) {
    this._volume = val;
    this.updateActiveInstanceVolume();
  }

  get volume() {
    return this._volume;
  }

  get closed() {
    return this._closed;
  }

  set volumeFactor(val: number) {
    this._volumeFactor = val;
  }

  get volumeFactor() {
    return this._volumeFactor;
  }


  constructor(sounds: SoundSequenceItems, options?: SoundSequenceOptions) {
    this.sequence = this.normaliseSoundConfigs(sounds);
    this.volume = isUndefined(options?.volume) ? 1 : options?.volume;
    this.volumeFactor = 1;
    this.loop = isUndefined(options?.loop) ? false : options?.loop;
  }

  update(time: TimeContext) {

  }

  /**
   *
   */
  play() {
    throwIf(this._closed, `Sequence is closed.`);
    if (!this.sequence.length) {
      this.onFinish.emit(true);
      return;
    }
    this.playTrack();
  }

  append(sounds: SoundSequenceItems) {
    this.sequence.push(...this.normaliseSoundConfigs(sounds));
    this.updateActiveInstanceLoop();
  }

  pause() {
    this._paused = true;
    if (!isUndefined(this.activeInstance)) {
      this.activeInstance.paused = true;
    }
  }

  resume() {
    this._paused = false;
    if (!isUndefined(this.activeInstance)) {
      this.activeInstance.paused = false;
    }
  }

  stop() {
    if (this._closed) {
      return;
    }
    this._closed = true;
    this.activeInstance?.stop();

    this.sequence = [];
    this.onFinish.emit();
  }

  private playTrack() {
    this.cursor++;
    /** note: probably, this validation never throw error cos of previous validations */
    throwIf(this.cursor >= this.sequence.length, `The cursor can't be greater than sequence length`);

    const toPlay = this.sequence[this.cursor];
    const volume = this.countTrackVolume(toPlay);

    const instanceOrPromise = sound.play(toPlay.name, {
      volume,
      complete: () => this.trackComplete(),
      loop: this.isLoopTrack()
    });

    if (!isPromise(instanceOrPromise)) {
      this.activeInstance = instanceOrPromise;
    } else {
      instanceOrPromise.then(instance => {
        this.activeInstance = instance;
        /** in case when pause or stop has been called before sound loaded */
        if (this._paused) {
          this.activeInstance.paused = this._paused;
        } else if (this._closed) {
          this.activeInstance.stop();
        }
      });
    }
  }

  private trackComplete() {
    this.activeInstance = undefined;
    if (this._closed) {
      return;
    }
    if (this.cursor + 1 >= this.sequence.length) {
      if (this.loop) {
        this.cursor = this.cursorStart;
      } else {
        this.stop();
        return;
      }
    }
    this.playTrack();
  }

  private updateActiveInstanceVolume() {
    if (!isUndefined(this.activeInstance) && !!this.sequence.length) {
      this.activeInstance.volume = this.countTrackVolume(this.sequence[this.cursor]);
    }
  }

  private countTrackVolume(track: TrackConfig): number {
    return +(this.volumeFactor * this.volume * (isNullOrUndefined(track.volume) ? 1 : track.volume))
      .toFixed(2);
  }

  /**
   *
   *
   * */
  private normaliseSoundConfigs(sounds: SoundSequenceItems) {
    return (!Array.isArray(sounds) ? [sounds] : sounds)
      .map(rawConf => {
        if (isString(rawConf)) {
          return {
            name: rawConf,
            volume: 1
          }
        }
        return {
          name: rawConf.name,
          volume: isUndefined(rawConf.volume) ? 1 : rawConf.volume
        }
      });
  }

  private isLoopTrack() {
    return this.sequence.length === 1 && this.loop;
  }

  private updateActiveInstanceLoop() {
    if (isUndefined(this.activeInstance)) {
      return;
    }
    this.activeInstance.loop = this.isLoopTrack();
  }
}
