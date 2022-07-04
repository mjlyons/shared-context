import { QueryClient } from 'react-query';
import { createLocalStoreState, mutators, Mutators, StoreState } from './local-store/store';
import { SimpleStore } from './simple-store/store';

type ContextManager = {
  reactQueryClient: QueryClient,
  localStore: SimpleStore<StoreState, Mutators>
}

let sharedContextManagerSingleton: null | ContextManager = null;

export const getSharedContextManager = () => {
  if (sharedContextManagerSingleton === null) {
    sharedContextManagerSingleton = {
      reactQueryClient: new QueryClient(),
      localStore: new SimpleStore(createLocalStoreState(), mutators)
    }
  }
  return sharedContextManagerSingleton;
}
