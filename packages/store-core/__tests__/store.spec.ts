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
  setName: (
    state: typeof initialState,
    payload: { firstName: string; lastName: string },
  ) => ({
    ...state,
    firstName: payload.firstName,
    lastName: payload.lastName,
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
    expect(store.get().firstName).toBe("John");
    expect(store.get().lastName).toBe("Doe");
  });
  it("should update the state when dispatching an action without payload", () => {
    store.dispatch("birthday");
    expect(store.get().age).toBe(22);

    store.dispatch("work");
    expect(store.get().networth).toBe(110000);
  });
  it("should update the state when dispatching an action with payload", () => {
    store.dispatch("setName", { firstName: "Jack", lastName: "Wazowski" });
    expect(store.get().firstName).toBe("Jack");
    expect(store.get().lastName).toBe("Wazowski");
  });
  it("should throw an error if the action does not exist", () => {
    expect(() => store.dispatch("nonExistingAction" as any, undefined)).toThrow(
      "Action nonExistingAction is not defined",
    );
  });
  it("should notify subscribers when the state changes", () => {
    const subscriber = jest.fn();
    store.subscribe(subscriber);

    store.dispatch("birthday");
    expect(subscriber).toHaveBeenCalledWith({ ...initialState, age: 22 });

    store.dispatch("setFirstName", { firstName: "Jack" });
    expect(subscriber).toHaveBeenCalledWith({
      ...initialState,
      age: 22,
      firstName: "Jack",
    });

    store.unsubscribe(subscriber);
    store.dispatch("birthday");

    expect(subscriber).toHaveBeenCalledTimes(2);
  });
  it("should not notify unsubscribed subscribers", () => {
    const subscriber = jest.fn();
    store.subscribe(subscriber);
    store.unsubscribe(subscriber);
  });
});
