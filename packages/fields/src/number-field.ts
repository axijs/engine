import {
  clampPolicy,
  clampMaxPolicy,
  clampMinPolicy,
  FieldPolicy,
  ClampPolicy,
  ClampMinPolicy,
  ClampMaxPolicy
} from './field-policies';
import {BaseField} from './base-field';
import {isNullOrUndefined} from '@axi-engine/utils';


export interface NumberFieldOptions {
  min?: number;
  max?: number;
  policies?: FieldPolicy<number>[];
}

export class NumberField extends BaseField<number> {
  get min(): number | undefined {
    const policy =
      this.policies.get<ClampPolicy>(ClampPolicy.id) ??
      this.policies.get<ClampMinPolicy>(ClampMinPolicy.id);
    return policy?.min;
  }

  get max(): number | undefined {
    const policy =
      this.policies.get<ClampPolicy>(ClampPolicy.id) ??
      this.policies.get<ClampMaxPolicy>(ClampMaxPolicy.id);
    return policy?.max;
  }

  get isMin(): boolean {
    const min = this.min;
    return isNullOrUndefined(min) ? false : this.value <= min!;
  }

  get isMax(): boolean {
    const max = this.max;
    return isNullOrUndefined(max) ? false : this.value >= max!;
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
    this.value = this.value + amount;
  }

  dec(amount = 1) {
    this.value = this.value - amount;
  }
}
