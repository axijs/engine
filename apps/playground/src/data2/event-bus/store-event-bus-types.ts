import {Emitter} from '@axijs/emitter';

export type FieldChangeEvent<T = unknown> = {
  path: string;
  oldValue: T;
  newValue: T;
}

export type AddNodeEvent<T = unknown> = {
  path: string;
  value?: T;
}

export type RemoveNodeEvent<T = unknown> = {
  path: string;
  oldValue?: T;
}

export type FieldChangeEventState<T> = {
  dirty: boolean;
  emitter: Emitter<[FieldChangeEvent<T>]>
}
