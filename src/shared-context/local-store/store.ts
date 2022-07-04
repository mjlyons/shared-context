import { createStoreContext } from "../simple-store/context";

export type StoreState = {
  query: string | null;
}

export const createLocalStoreState = (): StoreState => {
  return {
    query: 'shared-context',
  };
};

export const localStoreReducer = (state: StoreState) => state;

export const {StoreProvider: LocalStoreProvider, StoreConsumer: LocalStoreConsumer, useStore: useLocalStore} = createStoreContext<StoreState>();
