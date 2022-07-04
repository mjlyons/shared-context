import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { MutateFn, UnboundMutatorsBaseType, SimpleStore } from './store';

type StoreChangedHandler<StoreState> = (store: StoreState) => void;

export const createStoreContext = <
  StoreState,
  UnboundMutators extends UnboundMutatorsBaseType<StoreState>
>() => {
  const context = createContext<{
    storeState: StoreState;
    mutate: MutateFn<StoreState, UnboundMutators>;
    // mutate: {[ mutatorName: keyof Mutators]: (payload: Parameters<Mutators[typeof mutatorName]>[1]) => void};
  } | null>(null);

  const StoreProvider = ({
    children,
    store,
  }: {
    children: ReactNode;
    store: SimpleStore<StoreState, UnboundMutators>;
  }) => {
    const [storeState, setStoreState] = useState<StoreState>(store.getState());
    const onStoreChangeSubscription: StoreChangedHandler<StoreState> = useCallback(
      (updatedStoreState: StoreState) => {
        setStoreState(updatedStoreState);
      },
      [setStoreState]
    );

    useEffect(() => {
      const { subscriptionId } = store.registerStoreChangedSubscription(onStoreChangeSubscription);

      return () => {
        if (subscriptionId === null) {
          throw new Error('ERROR: tried to un-register for store changes without registering');
        }
        store.unregisterStoreChangedSubscription(subscriptionId);
      };
    }, [onStoreChangeSubscription, store]);

    return (
      <context.Provider value={{ storeState, mutate: store.mutate }}>{children}</context.Provider>
    );
  };

  const StoreConsumer = context.Consumer;
  const useStore = () => useContext(context);
  const useStoreState = () => {
    const store = useStore();
    return store?.storeState;
  };
  const useMutator = <MutatorName extends keyof UnboundMutators>(mutatorName: MutatorName) => {
    const store = useStore();
    return useCallback(
      (payload: Parameters<ReturnType<UnboundMutators[MutatorName]>>[0]) => {
        store?.mutate(mutatorName, payload);
      },
      [store, mutatorName]
    );
  };

  return { StoreProvider, StoreConsumer, useStoreState, useMutator };
};
