import {Policy} from './policy';

export class ClampMaxPolicy implements Policy<number> {
  static readonly id = 'clampMax';
  readonly id = ClampMaxPolicy.id;

  constructor(public max: number) {
  }

  apply(val: number) {
    return Math.min(this.max, val);
  }

  updateBounds(max: number) {
    this.max = max;
  }
}

export function clampMaxPolicy(max: number) {
  return new ClampMaxPolicy(max)
}
