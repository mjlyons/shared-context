import { SharedContextProvider } from './shared-context/context';
import { LocalStoreState } from './local-store-state';
import styles from './pagelet-b.module.css';
import { RepoStatus } from './repo-status';

export const PageletB = () => (
  <SharedContextProvider>
    <div className={styles.pageletB}>
      This is PageletB
      <RepoStatus />
      <LocalStoreState />
    </div>
  </SharedContextProvider>
);
