import {CoreStoreFactory, DataStoreHydrator, DataStoreSnapshotter} from './index';
import {CoreFieldSystem} from '../fields';

export type CoreStoreSystem = {
  factory: CoreStoreFactory,
  hydrator: DataStoreHydrator,
  snapshotter: DataStoreSnapshotter
}

/**
 * Initializes the high-level DataStore infrastructure.
 * Creates the store factory and serialization services based on the provided field system.
 *
 * @param fieldsSystem The initialized low-level field system.
 * @returns {CoreStoreSystem} A bundle of services for creating and managing DataStores.
 */
export function createCoreStoreSystem(fieldsSystem: CoreFieldSystem): CoreStoreSystem {
  return {
    factory: new CoreStoreFactory(fieldsSystem.factory),
    hydrator: new DataStoreHydrator(fieldsSystem.hydrator),
    snapshotter: new DataStoreSnapshotter(fieldsSystem.snapshotter)
  }
}
