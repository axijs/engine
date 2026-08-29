import {SerializedStore} from '../store-serializers';

export interface ScopeSnapshot {
  uid: string;
  name?: string;
  // parent?: ScopeSnapshot;
  children?: ScopeSnapshot[];
  data: SerializedStore;
}
