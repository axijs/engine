import {Subscribable} from '@axi-engine/utils';

export interface Field<T> {
  readonly name: string;
  value: T;

  onChange: Subscribable<[newValue: T, oldValue:T]>;
  destroy(): void;
}

