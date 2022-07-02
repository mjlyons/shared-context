import { SharedContextProvider } from '../shared-context/context';
import styles from './pagelet-a.module.css';
import { RepoStatus } from './repo-status';

export const PageletA = () => (
  <SharedContextProvider>
    <div className={styles.pageletA}>
      This is PageletA
      <RepoStatus />
    </div>
  </SharedContextProvider>
);
