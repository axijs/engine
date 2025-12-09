import {
  clampPolicy,
  clampMaxPolicy,
  clampMinPolicy,
  ClampPolicy,
  ClampMinPolicy,
  ClampMaxPolicy
} from '../policies';
import {DefaultField} from './default-field';
import {isNullOrUndefined} from '@axi-engine/utils';
import {FieldOptions, NumericField} from '../types';


export interface DefaultNumericFieldOptions extends FieldOptions<number> {
  min?: number;
  max?: number;
}

export class DefaultNumericField extends DefaultField<number> implements NumericField {
  static typeName = 'numeric';
  readonly typeName = DefaultNumericField.typeName;

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

  constructor(name: string, initialVal: number, options?: DefaultNumericFieldOptions) {
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

  isMin(): boolean {
    const min = this.min;
    return isNullOrUndefined(min) ? false : this.value <= min!;
  }

  isMax(): boolean {
    const max = this.max;
    return isNullOrUndefined(max) ? false : this.value >= max!;
  }

  inc(amount = 1) {
    this.value = this.value + amount;
  }

  dec(amount = 1) {
    this.value = this.value - amount;
  }
}
