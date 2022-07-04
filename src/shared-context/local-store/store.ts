import { createStoreContext } from "../simple-store/context";

export type StoreState = {
  query: string | null;
}

export const createLocalStoreState = (): StoreState => {
  return {
    query: 'shared-context',
  };
};

const setQuery = (state: StoreState) => (payload: {query: string | null}): StoreState => ({
  ...state,
  query: payload.query,
});

const resetQuery = (state: StoreState) => (payload: {}): StoreState => ({
  ...state,
  query: 'shared-context',
})

export const mutators = {
  setQuery,
  resetQuery,
};
export type Mutators = typeof mutators;

export const {
  StoreProvider: LocalStoreProvider, 
  StoreConsumer: LocalStoreConsumer, 
  useStore: useLocalStore
} = createStoreContext<StoreState, Mutators>();

