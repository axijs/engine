export type FieldChangeEvent<T = unknown> = {
  path: string;
  value: T;
}

export type AddNodeEvent<T = unknown> = {
  path: string;
  value?: T;
}

export type RemoveNodeEvent<T = unknown> = {
  path: string;
  oldValue?: T;
}
