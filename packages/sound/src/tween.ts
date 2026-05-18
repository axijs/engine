import {EasingFunction, EasingName, easings, TimeContext} from '@axi-engine/utils';

export interface TweenOptions {
  easing: EasingName;
  duration: number;
  from: number;
  to: number;
  paused?: boolean;

  onUpdate: (value: number) => void;
  onComplete?: () => void;
}

export class Tween {
  private options: TweenOptions;
  private readonly fn: EasingFunction;
  private _closed = false;
  private _paused = false;
  private counter = 0;

  get closed() {
    return this._closed;
  }

  get paused() {
    return this._paused;
  }

  constructor(options: TweenOptions) {
    this.options = options;
    this._paused = options.paused ?? false;

    this.fn = easings.getOrThrow(this.options.easing);
    this.play();
  }

  play() {
    if (this._closed) return;
    this._paused = false;
  }

  pause() {
    this._paused = true;
  }

  stop() {
    if (this._closed) return;
    this._closed = true;
    this.options.onComplete?.();
  }

  update(time: TimeContext) {
    if (this._closed || this._paused) {
      return;
    }
    this.counter += time.deltaMs;
    const progress = Math.min(this.counter / this.options.duration, 1.0);
    const easedProgress = this.fn(progress);

    const currentValue = this.options.from + (this.options.to - this.options.from) * easedProgress;
    this.options.onUpdate(currentValue);

    if (progress >= 1.0) {
      this.stop();
    }
  }
}
