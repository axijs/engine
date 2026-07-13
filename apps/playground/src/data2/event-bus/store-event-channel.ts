import {ensurePathString, EventChannel, type PathType} from '@axi-engine/utils';
import {Emitter} from '@axijs/emitter';

export class StoreEventChannel {
  channels = new EventChannel();
  // should to cal once per flush
  onAny = new Emitter<[string[]]>();

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
    this.channels.emit(strPath, event);
  }

  clear() {
    this.channels.clear();
    this.onAny.clear();
  }
}
