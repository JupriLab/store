import { CombineStores, Store } from "../src/index";

interface IDogsState {
  count: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type IDogsActions = {
  addDog: (state: IDogsState, payload: void) => IDogsState;
};

interface ICatsState {
  count: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ICatsActions = {
  addCat: (state: ICatsState, payload: void) => ICatsState;
};

describe("CombineStores", () => {
  let dogsStore: Store<IDogsState, IDogsActions>;
  let catsStore: Store<ICatsState, ICatsActions>;
  let catsAndDogsStore: CombineStores<{
    cats: Store<ICatsState, ICatsActions>;
    dogs: Store<IDogsState, IDogsActions>;
  }>;

  beforeEach(() => {
    dogsStore = new Store<IDogsState, IDogsActions>({
      actions: {
        addDog: (state) => ({
          ...state,
          count: state.count + 1,
        }),
      },
      initialState: {
        count: 0,
      },
      name: "dogs",
    });
    catsStore = new Store<ICatsState, ICatsActions>({
      actions: {
        addCat: (state) => ({
          ...state,
          count: state.count + 1,
        }),
      },
      initialState: {
        count: 0,
      },
      name: "cats",
    });
    catsAndDogsStore = new CombineStores({
      cats: catsStore,
      dogs: dogsStore,
    });
  });

  it("should return the correct store", () => {
    const store1 = catsAndDogsStore.getStore((selector) => selector.dogs);
    expect(store1).toBe(dogsStore);
    const store2 = catsAndDogsStore.getStore((selector) => selector.cats);
    expect(store2).toBe(catsStore);
  });

  it("should update dogs store state when dispatching addDog", () => {
    const store = catsAndDogsStore.getStore((selector) => selector.dogs);
    store.dispatch("addDog");
    expect(store.get().count).toBe(1);
  });

  it("should update cats store state when dispatching addCat", () => {
    const store = catsAndDogsStore.getStore((selector) => selector.cats);
    store.dispatch("addCat");
    expect(store.get().count).toBe(1);
  });

  it("should not affect cats store when dispatching addDog in dogs store", () => {
    const dogs = catsAndDogsStore.getStore((selector) => selector.dogs);
    const cats = catsAndDogsStore.getStore((selector) => selector.cats);

    dogs.dispatch("addDog");

    expect(dogs.get().count).toBe(1);
    expect(cats.get().count).toBe(0);
  });

  it("should not affect dogs store when dispatching addCat in cats store", () => {
    const dogs = catsAndDogsStore.getStore((selector) => selector.dogs);
    const cats = catsAndDogsStore.getStore((selector) => selector.cats);

    cats.dispatch("addCat");

    expect(dogs.get().count).toBe(0);
    expect(cats.get().count).toBe(1);
  });

  it("should subscribe and notify correctly", () => {
    const dogs = catsAndDogsStore.getStore((selector) => selector.dogs);
    const subscriber = jest.fn();
    const unsubscribe = dogs.subscribe(subscriber);

    dogs.dispatch("addDog");
    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith({ count: 1 });

    unsubscribe();
    dogs.dispatch("addDog");
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it("should handle multiple subscribers correctly", () => {
    const dogs = catsAndDogsStore.getStore((selector) => selector.dogs);
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    const unsubscribe1 = dogs.subscribe(subscriber1);
    const unsubscribe2 = dogs.subscribe(subscriber2);

    dogs.dispatch("addDog");
    expect(subscriber1).toHaveBeenCalledWith({ count: 1 });
    expect(subscriber2).toHaveBeenCalledWith({ count: 1 });

    unsubscribe1();
    dogs.dispatch("addDog");
    expect(subscriber1).toHaveBeenCalledTimes(1);
    expect(subscriber2).toHaveBeenCalledWith({ count: 2 });

    unsubscribe2();
    dogs.dispatch("addDog");
    expect(subscriber2).toHaveBeenCalledTimes(2);
  });

  it("should handle state correctly when using both stores", () => {
    const dogs = catsAndDogsStore.getStore((selector) => selector.dogs);
    const cats = catsAndDogsStore.getStore((selector) => selector.cats);

    dogs.dispatch("addDog");
    cats.dispatch("addCat");

    expect(dogs.get().count).toBe(1);
    expect(cats.get().count).toBe(1);
  });
});
