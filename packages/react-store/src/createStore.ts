import { Store, type IStoreConfigs, type TAction } from "@jupri-lab/store-core";
import { useEffect, useState } from "react";
import type { IUseStoreOptions } from "./types";

export function createStore<
  TInitialState extends object,
  TActions extends Record<string, TAction<TInitialState, any>>,
>(storeConfigs: IStoreConfigs<TInitialState, TActions>) {
  const store = new Store({
    actions: storeConfigs.actions,
    initialState: storeConfigs.initialState,
    middlewares: storeConfigs.middlewares,
    name: storeConfigs.name,
  });
  return (options: IUseStoreOptions = { subscribe: true }) => {
    const [, setState] = useState<TInitialState>(store.get());
    useEffect(() => {
      if (options.subscribe) {
        const subscriber = (newState: TInitialState) => {
          setState(newState);
        };
        const unsubscribe = store.subscribe(subscriber);
        return () => unsubscribe();
      }
    }, []);
    return store;
  };
}
