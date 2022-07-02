import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { getSharedContextManager } from './manager';

export const SharedContextProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getSharedContextManager().reactQueryClient;
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
