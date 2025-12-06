import {Subscribable} from '@axi-engine/utils';
import {Policy} from './policies';

export interface FieldOptions<T> {
  policies?: Policy<T>[]
}

export interface Field<T> {
  readonly name: string;
  value: T;

  setValueSilently(val: T): void;

  batchUpdate(updateFn: (currentValue: T) => T): void;

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

export interface BooleanField extends Field<boolean> {
  toggle(): boolean;
}

export interface StringField extends Field<string> {
  append(str: string | number): this
  prepend(str: string | number): this
  trim(): this
  isEmpty(): boolean
  clear(): void
}
