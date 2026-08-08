import {type PathType, Registry} from '@axi-engine/utils';
import type {FieldReferenceName, FieldReferences, StoreWithEvents} from '../references';
import type {ReferenceCreator} from './types.ts';

export class ReferenceRegistry {
  registry = new Registry<FieldReferenceName, ReferenceCreator<any>>();

  register(name: FieldReferenceName, creator: ReferenceCreator<any>) {
    this.registry.register(name, creator);
  }

  create<K extends FieldReferenceName>(type: K, store: StoreWithEvents, path: PathType): FieldReferences[K] {
    return this.registry.getOrThrow(type)(store, path);
  }
}
