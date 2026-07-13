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

export type CreateNodeListener<T = unknown> = (event: CreateNodeEvent<T>) => void;

export type ChangeFieldListener<T = unknown> = (event: ChangeFieldEvent<T>) => void;

export type DeleteNodeListener<T = unknown> = (event: DeleteNodeEvent<T>) => void;

export type AnyListener = (paths: string[]) => void;
