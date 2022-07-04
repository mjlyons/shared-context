import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { LocalStoreProvider } from '../local-store/store';
import { getSharedContextManager } from './manager';

export const SharedContextProvider = ({ children }: { children: ReactNode }) => {
  const sharedContextManager = getSharedContextManager();

  return (
    <QueryClientProvider client={sharedContextManager.reactQueryClient}>
      <LocalStoreProvider store={sharedContextManager.localStore}>{children}</LocalStoreProvider>
    </QueryClientProvider>
  );
};
