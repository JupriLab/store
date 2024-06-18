import { Store } from "../src/index";

const initialState = {
  age: 21,
  firstName: "John",
  lastName: "Doe",
  networth: 100000,
};

const actions = {
  birthday: (state: typeof initialState) => ({
    ...state,
    age: state.age + 1,
  }),
  setFirstName: (
    state: typeof initialState,
    payload: { firstName: string },
  ) => ({
    ...state,
    firstName: payload.firstName,
  }),
  work: (state: typeof initialState) => ({
    ...state,
    networth: state.networth + 10000,
  }),
};

describe("Store", () => {
  let store: Store<typeof initialState, typeof actions>;
  beforeEach(() => {
    store = new Store({
      actions,
      initialState,
      name: "user",
    });
  });
  it("should initialize with the correct state ", () => {
    expect(store.get()).toEqual(initialState);
  });
  it("should return the correct value for a specific key", () => {
    expect(store.getOne("firstName")).toBe("John");
    expect(store.getOne("lastName")).toBe("Doe");
  });
  it("should update the state when dispatching an action without payload", () => {
    store.dispatch("birthday", undefined);
    expect(store.getOne("age")).toBe(22);

    store.dispatch("work", undefined);
    expect(store.getOne("networth")).toBe(110000);
  });
  it("should update the state when dispatching an action with payload", () => {
    store.dispatch("setFirstName", { firstName: "Jack" });
    expect(store.getOne("firstName")).toBe("Jack");
  });
  it("should throw an error if the action does not exist", () => {
    expect(() => store.dispatch("nonExistingAction" as any, undefined)).toThrow(
      "Action nonExistingAction is not defined",
    );
  });
  it("should notify subscribers when the state changes", () => {
    const subscriber = jest.fn();
    store.subscribe(subscriber);

    store.dispatch("birthday", undefined);
    expect(subscriber).toHaveBeenCalledWith({ ...initialState, age: 22 });

    store.dispatch("setFirstName", { firstName: "Jack" });
    expect(subscriber).toHaveBeenCalledWith({
      ...initialState,
      age: 22,
      firstName: "Jack",
    });

    store.unsubscribe(subscriber);
    store.dispatch("birthday", undefined);

    expect(subscriber).toHaveBeenCalledTimes(2);
  });
  it("should not notify unsubscribed subscribers", () => {
    const subscriber = jest.fn();
    store.subscribe(subscriber);
    store.unsubscribe(subscriber);
  });
});
