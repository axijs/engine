import {StoreEventBus} from './event-bus';
import type {StoreChangeBuffer} from './store-change-buffer.ts';

export type EventDispatcherMode = 'lazy' | 'eager';

export class StoreEventDispatcher {
  mode: EventDispatcherMode = 'lazy';

  events: StoreEventBus;
  changes: StoreChangeBuffer;

  constructor(events: StoreEventBus, changes: StoreChangeBuffer) {
    this.events = events;
    this.changes = changes;
  }

  eagerCreated(path: string) {
    if (this.mode !== 'eager' || !this.changes.hasCreated(path)) {
      return;
    }
    this.events.emitOnCreate(path, this.changes.getCreatedValue(path));
    this.changes.unsetCreated(path);
  }

  eagerChanged(path: string) {
    if (this.mode !== 'eager' || !this.changes.hasChanged(path)) {
      return;
    }
    const val = this.changes.getChangedValue(path);
    this.events.emitOnChange(path, val.value, val.oldValue);
    this.changes.unsetChanged(path);
  }

  eagerDeleted(path: string) {
    if (this.mode !== 'eager' || !this.changes.hasDeleted(path)) {
      return;
    }
    this.events.emitOnDelete(path, this.changes.getDeletedValue(path));
    this.changes.unsetDeleted(path);
  }

  flush() {
    this.flushCreated();
    this.flushChanged();
    this.flushDeleted();
  }

  private flushCreated() {
    const paths = this.changes.getCreatedPaths();
    if (!paths.length) return;

    this.events.emitOnAnyCreate(paths);
    paths.forEach(path => this.events.emitOnCreate(path, this.changes.getCreatedValue(path)));
  }

  private flushChanged() {
    const paths = this.changes.getChangedPaths();
    if (!paths.length) return;

    this.events.emitOnAnyChange(paths);

    paths.forEach(path => {
      const val = this.changes.getChangedValue(path);
      this.events.emitOnChange(path, val.value, val.oldValue)
    });
  }

  private flushDeleted() {
    const paths = this.changes.getDeletedPaths();
    if (!paths.length) return;

    this.events.emitOnAnyDelete(paths);
    paths.forEach(path => this.events.emitOnDelete(path, this.changes.getDeletedValue(path)));
  }
}
