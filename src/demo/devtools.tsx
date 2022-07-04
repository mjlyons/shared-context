import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getSharedContextManager } from '../shared-context/manager';

export const Devtools = () => (
  <QueryClientProvider client={getSharedContextManager().reactQueryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
