import {NodeReference} from './node-reference';

export interface CollectionReference extends NodeReference<void> {
  clear(): void;
}
