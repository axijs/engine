import {isNullOrUndefined, isPromise, isString, isUndefined, throwIf} from '@axijs/ensure';
import {Emitter, StateEmitter} from '@axijs/emitter';
import {TimeContext} from '@axi-engine/utils';
import {IMediaInstance, sound} from '@pixi/sound';
import {SoundSequence} from './sound-sequence';
import {SoundSequenceOptions} from './sound-sequence-options';
import {TrackConfig} from './track-config';
import {EasingParam, SoundSequenceItems, SoundSequenceState} from './types';
import {Tween} from './tween';
import {parseEasing} from './tween-helpers';

export class CoreSoundSequence implements SoundSequence {

  _state: SoundSequenceState = SoundSequenceState.ready;

  private _initialVolume = 1; // saved volume for restoring after tween animations
  private _volume = 1;
  private _volumeFactor = 1;
  private _loop = false;

  private cursorStart = -1;
  private _cursor = this.cursorStart;
  private readonly sequence: TrackConfig[];

  private activeInstance: IMediaInstance | undefined;
  private tween: Tween | undefined;

  readonly onPlay = new Emitter();
  readonly onFinish = new Emitter();
  readonly onState: StateEmitter<[SoundSequenceState]> = new StateEmitter([this._state]);

  set loop(val: boolean) {
    this._loop = val;
    this.updateActiveInstanceLoop();
  }

  get loop(): boolean {
    return this._loop;
  }

  get cursor(): number {
    return this._cursor;
  }

  get initialVolume(): number {
    return this._initialVolume;
  }

  set volume(val: number) {
    this._initialVolume = val;
    this.setInternalVolume(val);
  }

  /**
   * return current volume
   */
  get volume() {
    return this._volume;
  }

  set volumeFactor(val: number) {
    this._volumeFactor = val;
    this.updateActiveInstanceVolume();
  }

  get volumeFactor() {
    return this._volumeFactor;
  }

  get state() {
    return this._state;
  }

  get paused() {
    return this._state === SoundSequenceState.paused;
  }

  get stopped() {
    return this._state === SoundSequenceState.stopped;
  }

  constructor(sounds: SoundSequenceItems, options?: SoundSequenceOptions) {
    this.sequence = this.normaliseSoundConfigs(sounds);
    this.volume = isUndefined(options?.volume) ? 1 : options?.volume;
    this.volumeFactor = isUndefined(options?.volumeFactor) ? 1 : options?.volumeFactor;
    this.loop = isUndefined(options?.loop) ? false : options?.loop;
  }

  update(time: TimeContext) {
    this.tween?.update(time);
  }

  append(sounds: SoundSequenceItems) {
    this.sequence.push(...this.normaliseSoundConfigs(sounds));
    this.updateActiveInstanceLoop();
  }

  /**
   *
   */
  play(fadeIn?: EasingParam) {
    if (this.state !== SoundSequenceState.ready) {
      this.reset();
    }
    this.changeState(SoundSequenceState.playing);
    if (!this.sequence.length) {
      return this.finish();
    }

    this.onPlay.emit();
    this.fadeIn(fadeIn);
    this.playTrack();
  }

  pause(fadeOut?: EasingParam) {
    if (this._state !== SoundSequenceState.playing) {
      return;
    }
    this.changeState(SoundSequenceState.paused);
    this.fadeOut(fadeOut, () => {
      if (!isUndefined(this.activeInstance)) {
        this.activeInstance.paused = true;
      }
    });
  }

  resume(fadeIn?: EasingParam) {
    if (this._state !== SoundSequenceState.paused) {
      return;
    }
    this.changeState(SoundSequenceState.playing);
    this.fadeIn(fadeIn);
    if (!isUndefined(this.activeInstance)) {
      this.activeInstance.paused = false;
    }
  }

  stop(fadeOut?: EasingParam) {
    if (this._state === SoundSequenceState.stopped) {
      return;
    }
    if (this._state === SoundSequenceState.paused) {
      this.finish();
    } else {
      this.fadeOut(fadeOut, () => this.finish());
    }
    this.changeState(SoundSequenceState.stopped);
  }

  private playTrack() {
    this._cursor++;
    /**
     * note: probably, this validation never throw error cos of previous validations
     * but let the validation remain
     */
    throwIf(this._cursor >= this.sequence.length, `The cursor can't be greater than sequence length`);

    const toPlay = this.sequence[this._cursor];
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
        if (this.paused) {
          this.activeInstance.paused = this.paused;
        } else if (this.stopped) {
          if (isNullOrUndefined(this.tween)) {
            this.activeInstance.stop();
          }
        }
      });
    }
  }

  private trackComplete() {
    this.activeInstance = undefined;
    if (this.stopped && isNullOrUndefined(this.tween)) {
      return;
    }
    if (this._cursor + 1 >= this.sequence.length) {
      if (this.loop) {
        this._cursor = this.cursorStart;
      } else {
        this.tween?.stop();
        this.stop();
        return;
      }
    }
    this.playTrack();
  }

  private fadeIn(fadeParam?: EasingParam, doneCallback?: () => void) {
    this.fadeVolume(this._volume, this._initialVolume, fadeParam, doneCallback);
  }

  private fadeOut(fadeParam?: EasingParam, doneCallback?: () => void) {
    this.fadeVolume(this.volume, 0, fadeParam, doneCallback);
  }

  private fadeVolume(from: number, to: number, fadeParam?: EasingParam, doneCallback?: () => void) {
    if (isNullOrUndefined(fadeParam)) {
      doneCallback?.();
      return;
    }
    this.tween?.stop();
    const easingConfig = parseEasing(fadeParam);
    this.tween = new Tween({
      easing: easingConfig.easing,
      duration: easingConfig.duration,
      from,
      to,
      onUpdate: (val: number) => this.setInternalVolume(val),
      onStart: (tween: Tween) => this._volume = tween.from,
      onComplete: (tween: Tween) => {
        this._volume = tween.to;
        this.tween = undefined;
        doneCallback?.();
      }
    });
  }

  private setInternalVolume(val: number) {
    this._volume = val;
    this.updateActiveInstanceVolume();
  }

  private updateActiveInstanceVolume() {
    if (isUndefined(this.activeInstance) || !this.sequence.length) {
      return;
    }
    this.activeInstance.volume = this.countTrackVolume(this.sequence[this._cursor]);
  }

  private countTrackVolume(track: TrackConfig): number {
    return +(this._volumeFactor * this._volume * (isNullOrUndefined(track.volume) ? 1 : track.volume))
      .toFixed(2);
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

  private changeState(newState: SoundSequenceState) {
    this._state = newState;
    this.onState.emit(this._state);
  }

  private reset() {
    this.tween?.stop(); // will call onComplete where will be: this.tween = undefined
    this.clearActiveInstance();
    this._cursor = this.cursorStart;
    this._volume = this._initialVolume;
    this.changeState(SoundSequenceState.ready);
  }

  private finish() {
    this.clearActiveInstance();
    this.onFinish.emit();
  }

  private clearActiveInstance() {
    this.activeInstance?.stop();
    this.activeInstance = undefined;
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
}
