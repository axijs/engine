export type EventChannelMode = 'lazy' | 'eager';

export type ChangeFieldEvent<T = unknown> = {
  path: string;
  value: T;
  oldValue?: T;
}

export type CreateNodeEvent<T = unknown> = {
  path: string;
  value?: T;
}

export type DeleteNodeEvent<T = unknown> = {
  path: string;
  oldValue?: T;
}

