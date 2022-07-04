export type SubscriptionId = number & { __type: 'SubscriptionId' };
export type StoreChangedHandler<StoreState> = (storeState: StoreState) => void;
export type UnboundMutatorsBaseType<StoreState> = {[k: string]: (state: StoreState) => (payload: any) => StoreState};
export type MutateFn<
  StoreState,
  UnboundMutators extends UnboundMutatorsBaseType<StoreState>
> = <MutatorName extends keyof UnboundMutators>(
  mutatorName: MutatorName, 
  payload: Parameters<ReturnType<UnboundMutators[MutatorName]>>[0]) => void;
export type Mutators<StoreState, UnboundMutators extends UnboundMutatorsBaseType<StoreState>> = {
  [MutatorName in keyof UnboundMutators]: (payload: Parameters<ReturnType<UnboundMutators[MutatorName]>>[0]) => void
};
export class SimpleStore<StoreState, UnboundMutators extends UnboundMutatorsBaseType<StoreState>> {

  private state: StoreState;
  private unboundMutators: UnboundMutators;
  private nextSubscriptionId: SubscriptionId = 1 as SubscriptionId;
  private subscriptions: Map<SubscriptionId, StoreChangedHandler<StoreState>> = new Map();

  constructor(initialStore: StoreState, unboundMutators: UnboundMutators) {
    this.state = initialStore;
    this.unboundMutators = unboundMutators;
  }

  registerStoreChangedSubscription = (storeChangedHandler: (storeState: StoreState) => void) => {
    const subscriptionId = this.nextSubscriptionId;
    this.subscriptions.set(subscriptionId, storeChangedHandler);
    this.nextSubscriptionId++;
    return {subscriptionId};
  }

  unregisterStoreChangedSubscription = (subscriptionId: SubscriptionId) => {
    this.subscriptions.delete(subscriptionId);
  }

  setState = (updatedStoreState: StoreState) => {
    this.state = updatedStoreState;
    this.subscriptions.forEach((changedHandler) => {
      changedHandler(this.state);
    });
  }

  getState = () => this.state;

  mutate: MutateFn<StoreState, UnboundMutators> = (mutatorName, payload) => {
    const currentState = this.getState();
    const updatedState = this.unboundMutators[mutatorName](currentState)(payload);
    this.setState(updatedState);
  }
}
