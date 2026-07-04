import type {PathType} from '@axi-engine/utils';
import type {
  ChangeFieldListener,
  CreateNodeListener,
  DeleteNodeListener
} from './types.ts';

export interface StoreEventSubscriber {
  onCreate<T = unknown>(path: PathType, listener: CreateNodeListener<T>): void;

  onChange<T = unknown>(path: PathType, listener: ChangeFieldListener<T>): void;

  onDelete<T = unknown>(path: PathType, listener: DeleteNodeListener<T>): void;

  unsubscribeOnCreate<T = unknown>(path: PathType, listener: CreateNodeListener<T>): void;

  unsubscribeOnChange<T = unknown>(path: PathType, listener: ChangeFieldListener<T>): void;

  unsubscribeOnDelete<T = unknown>(path: PathType, listener: DeleteNodeListener<T>): void;
}
