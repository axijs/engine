import {type DataStorage, type PathType} from '@axi-engine/utils';
import type {StoreEventSubscriber} from '../event-bus/store-event-subscriber.ts';
import type {FieldReferenceName} from './field-references.ts';

export type StoreWithEvents = DataStorage & StoreEventSubscriber;

export type ReferenceCreator<T> = (store: StoreWithEvents, path: PathType) => T;

export type ReferenceRegistryConfig = Partial<Record<FieldReferenceName, ReferenceCreator<any>>>;
