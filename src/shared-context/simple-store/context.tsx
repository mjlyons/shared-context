import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { MutateFn, MutatorsBaseType, SimpleStore } from './store';

type StoreChangedHandler<StoreState> = (store: StoreState) => void;

export const createStoreContext = <StoreState, Mutators extends MutatorsBaseType<StoreState>>() => {
  const context = createContext<{
    storeState: StoreState;
    mutate: MutateFn<StoreState, Mutators>;
    // mutate: {[ mutatorName: keyof Mutators]: (payload: Parameters<Mutators[typeof mutatorName]>[1]) => void};
  } | null>(null);

  const StoreProvider = ({
    children,
    store,
  }: {
    children: ReactNode;
    store: SimpleStore<StoreState, Mutators>;
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

  return { StoreProvider, StoreConsumer, useStore };
};
