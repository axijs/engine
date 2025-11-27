import {
  clampPolicy,
  clampMaxPolicy,
  clampMinPolicy,
  FieldPolicy,
  ClampPolicy,
  ClampMinPolicy,
  ClampMaxPolicy
} from './field-policies';
import {Field} from './field';
import {isNullOrUndefined} from '@axi-engine/utils';


export interface NumberFieldOptions {
  min?: number;
  max?: number;
  policies?: FieldPolicy<number>[];
}

export class NumberField extends Field<number> {
  get min(): number | undefined {
    const policy =
      this.getPolicy<ClampPolicy>(ClampPolicy.id) ??
      this.getPolicy<ClampMinPolicy>(ClampMinPolicy.id);
    return policy?.min;
  }

  get max(): number | undefined {
    const policy =
      this.getPolicy<ClampPolicy>(ClampPolicy.id) ??
      this.getPolicy<ClampMaxPolicy>(ClampMaxPolicy.id);
    return policy?.max;
  }

  get isMin(): boolean {
    const min = this.min;
    return isNullOrUndefined(min) ? false : this.val <= min!;
  }

  get isMax(): boolean {
    const max = this.max;
    return isNullOrUndefined(max) ? false : this.val >= max!;
  }

  constructor(name: string, initialVal: number, options?: NumberFieldOptions) {
    const policies = options?.policies ?? [];
    if (!isNullOrUndefined(options?.min) && !isNullOrUndefined(options?.max)) {
      policies.unshift(clampPolicy(options!.min!, options!.max!));
    } else if (!isNullOrUndefined(options?.min)) {
      policies.unshift(clampMinPolicy(options!.min!));
    } else if (!isNullOrUndefined(options?.max)) {
      policies.unshift(clampMaxPolicy(options!.max!));
    }
    super(name, initialVal, {policies});
  }

  inc(amount = 1) {
    this.set(this.val + amount);
  }

  dec(amount = 1) {
    this.set(this.val - amount);
  }
}
