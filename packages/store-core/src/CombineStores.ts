import type Store from "./Store";

export class CombineStores<TStores extends Record<string, Store<any, any>>> {
  private stores: TStores;
  constructor(stores: TStores) {
    this.stores = stores;
  }

  getStore<TSelector extends (stores: TStores) => any>(
    selector: TSelector,
  ): ReturnType<TSelector> {
    return selector(this.stores);
  }
}
