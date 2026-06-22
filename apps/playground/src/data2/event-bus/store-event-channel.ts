import {ensurePathString, EventChannel, type PathType} from '@axi-engine/utils';
import type {EventChannelMode} from './types.ts';


export class StoreEventChannel {

  mode: EventChannelMode = 'lazy';

  channels = new EventChannel();
  pendingChannels = new Map<string, any>();

  subscribe<TEvent>(path: PathType, listener: (event: TEvent) => void) {
    return this.channels.subscribe(path, listener);
  }

  unsubscribe<TEvent>(path: PathType, listener: (event: TEvent) => void) {
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
    for (const [path, event] of this.pendingChannels) {
      this.channels.emit(path, event);
    }
    this.pendingChannels.clear();
  }

  clear() {
    this.channels.clear();
    this.pendingChannels.clear();
  }
}
