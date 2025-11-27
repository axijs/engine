export interface FieldPolicy<T> {
  readonly id: string;
  apply: (val: T) => T
  destroy?: () => void
}

export class ClampPolicy implements FieldPolicy<number> {
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

export class ClampMinPolicy implements FieldPolicy<number> {
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

export class ClampMaxPolicy implements FieldPolicy<number> {
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

export function clampPolicy(min: number, max: number) {
  return new ClampPolicy(min, max)
}

export function clampMinPolicy(min: number) {
  return new ClampMinPolicy(min)
}

export function clampMaxPolicy(max: number) {
  return new ClampMaxPolicy(max)
}
