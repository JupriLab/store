import type { IStoreConfigs, TAction, TSubscriber } from "./types";

export default class Store<
  TInitialState extends object,
  TActions extends Record<string, TAction<TInitialState, any>>,
> {
  private subscribers: Set<TSubscriber<TInitialState>> = new Set();
  private states: TInitialState;
  private actions: TActions;
  constructor(configs: IStoreConfigs<TInitialState, TActions>) {
    this.states = configs.initialState;
    this.actions = configs.actions;
  }

  get(): TInitialState {
    return this.states;
  }

  dispatch<T extends keyof TActions>(
    actionName: T,
    ...payload: Parameters<TActions[T]>[1] extends void
      ? []
      : [Parameters<TActions[T]>[1]]
  ) {
    const action = this.actions[actionName] as TActions[T] | undefined;
    if (action) {
      this.states = action(this.states, payload[0]);
      this.notify();
    } else {
      throw new Error(`Action ${String(actionName)} is not defined`);
    }
  }

  subscribe(callback: TSubscriber<TInitialState>) {
    this.subscribers.add(callback);
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback: TSubscriber<TInitialState>) {
    this.subscribers.delete(callback);
  }

  private notify() {
    this.subscribers.forEach((callback) => callback(this.states));
  }
}
