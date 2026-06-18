import type {FieldChangeEvent, FieldChangeEventState} from './store-event-bus-types.ts';
import {ensurePathString, type PathType, Registry} from '@axi-engine/utils';
import {Emitter} from '@axijs/emitter';

export class StoreEventBus {
  private changeEmitters = new Registry<string, FieldChangeEventState<any>>();

  // private addEmitters = new Registry<string, Emitter<[AddNodeEvent<any>]>>();
  // private removeEmitters = new Registry<string, Emitter<[RemoveNodeEvent<any>]>>();

  // public readonly onAnyChange = new Emitter<[FieldChangeEvent<any>]>();
  // public readonly onAnyAdd = new Emitter<[AddNodeEvent<any>]>();
  // public readonly onAnyRemove = new Emitter<[RemoveNodeEvent<any>]>();

  flushEvents() {

  }

  markDirty(key: string) {
    if (!this.changeEmitters.has(key)) {
      return;
    }
    this.changeEmitters.getOrThrow(key).dirty = true;
  }

  /** on field change event */
  onChange<T>(path: PathType, callback: (value: FieldChangeEvent<T>) => void) {
    const strPath = ensurePathString(path);
    if (!this.changeEmitters.has(strPath)) {
      this.changeEmitters.register(strPath, {
        dirty: false,
        emitter: new Emitter<[FieldChangeEvent<T>]>()
      });
    }
    const emitterConfig = this.changeEmitters.getOrThrow(strPath);
    emitterConfig.emitter.subscribe(callback);

    // console.log(path);
  }

  unsubscribeOnChange(path: PathType) {

  }

  // /**  on add new node to group */
  // onAdd(path: PathType) {
  //   console.log(path);
  // }
  //
  // /** on remove node from group */
  // onRemove(path: PathType){
  //   console.log(path);
  // }

  private resetDirty() {

  }

  private removeUnused() {

  }

}
