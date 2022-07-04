import { useLocalStoreState } from '../shared-context/local-store/store';

export const LocalStoreState = () => {
  const localStoreState = useLocalStoreState();
  if (!localStoreState) {
    return <div>ERROR: missing local store provider</div>;
  }
  return <div>{JSON.stringify(localStoreState)}</div>;
};
