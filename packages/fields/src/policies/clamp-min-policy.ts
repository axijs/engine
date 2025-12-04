import {Policy} from './policy';

export class ClampMinPolicy implements Policy<number> {
  static readonly id = 'clampMin';
  readonly id = ClampMinPolicy.id;

  constructor(public min: number) {
  }

  apply(val: number) {
    return Math.max(this.min, val);
  }

  updateBounds(min: number) {
    this.min = min;
  }
}

export function clampMinPolicy(min: number) {
  return new ClampMinPolicy(min)
}
