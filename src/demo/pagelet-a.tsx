import { SharedContextProvider } from './shared-context/context';
import { LocalStoreState } from './local-store-state';
import styles from './pagelet-a.module.css';
import { RepoStatus } from './repo-status';
import { SearchInput } from './search-input';

export const PageletA = () => (
  <SharedContextProvider>
    <div className={styles.pageletA}>
      This is PageletA
      <SearchInput />
      <RepoStatus />
      <LocalStoreState />
    </div>
  </SharedContextProvider>
);
