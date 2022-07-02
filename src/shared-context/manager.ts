import { QueryClient } from 'react-query';

type ContextManager = {
  reactQueryClient: QueryClient;
}

let sharedContextManagerSingleton: null | ContextManager = null;

export const getSharedContextManager = () => {
  if (sharedContextManagerSingleton === null) {
    sharedContextManagerSingleton = {
      reactQueryClient: new QueryClient(),
    }
  }
  return sharedContextManagerSingleton;
}
