import { useLocalStore } from '../shared-context/local-store/store';

export const LocalStoreState = () => {
  const localStore = useLocalStore();
  if (!localStore) {
    return <div>ERROR: missing local store provider</div>;
  }
  return <div>{JSON.stringify(localStore.storeState)}</div>;
};
