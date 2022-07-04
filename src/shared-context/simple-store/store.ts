export type SubscriptionId = number & { __type: 'SubscriptionId' };
export type StoreChangedHandler<StoreState> = (storeState: StoreState) => void;
export type MutatorsBaseType<StoreState> = {[k: string]: (state: StoreState) => (payload: any) => StoreState};
export type GetMutatorFn<StoreState, Mutators extends MutatorsBaseType<StoreState>> = (mutatorName: keyof Mutators) => ((payload: Parameters<ReturnType<Mutators[typeof mutatorName]>>[0]) => void);
export class SimpleStore<StoreState, Mutators extends MutatorsBaseType<StoreState>> {

  private state: StoreState;
  private mutators: Mutators;
  private nextSubscriptionId: SubscriptionId = 1 as SubscriptionId;
  private subscriptions: Map<SubscriptionId, StoreChangedHandler<StoreState>> = new Map();

  constructor(initialStore: StoreState, mutators: Mutators) {
    this.state = initialStore;
    this.mutators = mutators;
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

  mutate = <MutatorName extends keyof Mutators>(mutatorName: MutatorName, payload: Parameters<ReturnType<Mutators[MutatorName]>>[0]) => {
    const currentState = this.getState();
    const updatedState = this.mutators[mutatorName](currentState)(payload);
    this.setState(updatedState);
  }

  getMutator: GetMutatorFn<StoreState, Mutators> = (mutatorName) => {
    const currentState = this.getState();
    return ((payload): void => {
      const updatedState = this.mutators[mutatorName](currentState)(payload);
      this.setState(updatedState);
    });
  }
}
