import { Devtools } from './devtools';
import styles from './index.module.css';
import { PageletA } from './pagelet-a';
import { PageletB } from './pagelet-b';

export const DemoRoot = () => (
  <div className={styles.demoRoot}>
    This is the demo root
    <PageletA />
    <PageletB />
    <Devtools />
  </div>
);
