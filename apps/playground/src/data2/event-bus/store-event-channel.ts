import type {FieldChangeEvent} from './store-event-bus-types.ts';
import {ensurePathString, EventChannel, type PathType} from '@axi-engine/utils';


export class StoreEventChannel {

  mode: 'lazy' | 'eager' = 'lazy';

  channels = new EventChannel();
  pendingChannels = new Map<string, any>();

  subscribe<TEvent>(path: PathType, listener: (value: TEvent) => void) {
    return this.channels.subscribe(path, listener);
  }

  unsubscribe<TEvent>(path: PathType, listener: (value: TEvent) => void) {
    return this.channels.unsubscribe(path, listener);
  }

  emit<TEvent>(path: PathType, event: TEvent) {
    const strPath = ensurePathString(path);

    if (!this.channels.has(strPath)) {
      return;
    }

    if (this.mode === 'eager') {
      this.channels.emit(strPath, event);
    } else {
      this.pendingChannels.set(strPath, event);
    }
  }

  flush() {
    if (!this.pendingChannels.size) {
      return;
    }
    for (const [path, value] of this.pendingChannels) {
      this.channels.emit<FieldChangeEvent>(path, {path, value});
    }
    this.pendingChannels.clear();
  }

}
