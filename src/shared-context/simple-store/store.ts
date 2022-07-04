export type SubscriptionId = number & { __type: 'SubscriptionId' };
export type Reducer<StoreState> = (storeState: StoreState) => StoreState;
export type StoreChangedHandler<StoreState> = (storeState: StoreState) => void;

export class SimpleStore<StoreState> {

  private state: StoreState;
  private reducer: Reducer<StoreState>;
  private nextSubscriptionId: SubscriptionId = 1 as SubscriptionId;
  private subscriptions: Map<SubscriptionId, StoreChangedHandler<StoreState>> = new Map();

  constructor(initialStore: StoreState, reducer: Reducer<StoreState>) {
    this.state = initialStore;
    this.reducer = reducer;
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

  updateState = (updatedStoreState: StoreState) => {
    this.state = updatedStoreState;
    this.subscriptions.forEach((changedHandler) => {
      changedHandler(this.state);
    });
  }

  getState = () => this.state;
}