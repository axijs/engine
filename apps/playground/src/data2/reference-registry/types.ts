import type {PathType} from '@axi-engine/utils';
import type {FieldReferenceName, StoreWithEvents} from '../references';

export type ReferenceCreator<T> = (store: StoreWithEvents, path: PathType) => T;

export type ReferenceRegistryConfig = Partial<Record<FieldReferenceName, ReferenceCreator<any>>>;
