import {CoreFields, CoreFieldTree, FieldTreeFactory} from '../fields';
import {CoreStore} from './core-store';

export class CoreStoreFactory {
  constructor(private readonly treeFactory: FieldTreeFactory<CoreFields>) {
  }

  create(treeOrFactory?: CoreFieldTree | FieldTreeFactory<CoreFields>, variables?: CoreFields): CoreStore {
    return new CoreStore(treeOrFactory ?? this.treeFactory, variables);
  }
}
