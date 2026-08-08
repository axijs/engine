export interface StoreEventEmitter {
  emitOnCreate<T = unknown>(path: string, value?: T): void;
  emitOnChange<T = unknown>(path: string, value: T, oldValue: T): void;
  emitOnDelete<T = unknown>(path: string, oldValue?: T): void;
}
