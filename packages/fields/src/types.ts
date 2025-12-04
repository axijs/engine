import {Subscribable} from '@axi-engine/utils';

export interface Field<T> {
  readonly name: string;
  value: T;

  onChange: Subscribable<[newValue: T, oldValue:T]>;
  destroy(): void;
}

export interface NumericField extends Field<number> {
  readonly min: number | undefined;
  readonly max: number | undefined;

  isMin(): boolean;
  isMax(): boolean;

  inc(val: number): void;
  dec(val: number): void;
}
