import type {DeleteNodeListener} from '../event-bus';

export interface NodeReference<T> {
  readonly path: string;
  readonly pathArr: string[];

  onDelete(listener: DeleteNodeListener<T>): void;
  unsubscribeOnDelete(listener: DeleteNodeListener<T>): void;
}
