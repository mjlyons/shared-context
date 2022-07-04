import { QueryClient } from 'react-query';
import { createLocalStoreState, localStoreReducer, StoreState } from './local-store/store';
import { SimpleStore } from './simple-store/store';

type ContextManager = {
  reactQueryClient: QueryClient,
  localStore: SimpleStore<StoreState>
}

let sharedContextManagerSingleton: null | ContextManager = null;

export const getSharedContextManager = () => {
  if (sharedContextManagerSingleton === null) {
    sharedContextManagerSingleton = {
      reactQueryClient: new QueryClient(),
      localStore: new SimpleStore(createLocalStoreState(), localStoreReducer)
    }
  }
  return sharedContextManagerSingleton;
}
