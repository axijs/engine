import {type PathType, Registry} from '@axi-engine/utils';
import type {FieldReferenceName} from './field-references.ts';
import type {StoreWithEvents} from './field-ref.ts';


export type ReferenceCreator<T> = (store: StoreWithEvents, path: PathType) => T;

export class ReferenceRegistry {
  registry = new Registry<FieldReferenceName, ReferenceCreator<any>>();


}
