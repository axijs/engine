import {SerializedStore} from '../store-serializers';

export interface ScopeSnapshot {
  uid: string,
  name?: string,
  parent?: string // parent uid
  data: SerializedStore
}
