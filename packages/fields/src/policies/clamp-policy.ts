import {Policy} from './policy';

export class ClampPolicy implements Policy<number> {
  static readonly id = 'clamp';
  readonly id = ClampPolicy.id;

  constructor(public min: number, public max: number) {
  }

  apply(val: number) {
    return Math.max(this.min, Math.min(this.max, val));
  }

  updateBounds(min: number, max: number) {
    this.min = min;
    this.max = max;
  }
}

export function clampPolicy(min: number, max: number) {
  return new ClampPolicy(min, max)
}

