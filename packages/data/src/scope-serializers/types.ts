import {SerializedStore} from '../store-serializers';

export interface ScopeSnapshot {
  uid: string;
  name?: string;
  parentUid?: string;
  children?: ScopeSnapshot[];
  data: SerializedStore;
}
