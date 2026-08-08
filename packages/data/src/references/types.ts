import {type DataStorage} from '@axi-engine/utils';
import type {StoreEventSubscriber} from '../event-bus';

export type StoreWithEvents = DataStorage & StoreEventSubscriber;
