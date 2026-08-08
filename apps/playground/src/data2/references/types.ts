import {type DataStorage} from '@axi-engine/utils';
import type {StoreEventSubscriber} from '../event-bus/store-event-subscriber.ts';

export type StoreWithEvents = DataStorage & StoreEventSubscriber;
