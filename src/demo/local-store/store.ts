import { createStoreContext } from "../../simple-store/context";
import { Mutators } from "../../simple-store/store";

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
export type UnboundLocalMutators = typeof mutators;
export type LocalMutators = Mutators<StoreState, UnboundLocalMutators>;

export const {
  StoreProvider: LocalStoreProvider, 
  StoreConsumer: LocalStoreConsumer, 
  useStoreState: useLocalStoreState,
  useMutator: useLocalMutator,
} = createStoreContext<StoreState, UnboundLocalMutators>();
