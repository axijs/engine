import type {Unsubscribable} from '@axijs/emitter';
import type {PathType} from '@axi-engine/utils';
import type {
  ChangeFieldListener,
  CreateNodeListener,
  DeleteNodeListener
} from './types.ts';


export interface StoreEventSubscriber {
  onCreate<T = unknown>(path: PathType, listener: CreateNodeListener<T>): Unsubscribable;

  onChange<T = unknown>(path: PathType, listener: ChangeFieldListener<T>): Unsubscribable;

  onDelete<T = unknown>(path: PathType, listener: DeleteNodeListener<T>): Unsubscribable;

  unsubscribeOnCreate<T = unknown>(path: PathType, listener: CreateNodeListener<T>): void;

  unsubscribeOnChange<T = unknown>(path: PathType, listener: ChangeFieldListener<T>): void;

  unsubscribeOnDelete<T = unknown>(path: PathType, listener: DeleteNodeListener<T>): void;
}
