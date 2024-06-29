# JupriLab Store

A lightweight, type-safe, and versatile state management solution designed for simplicity and ease of integration. It provides a straightforward API for defining initial states, actions to modify state, and subscribing to state changes. With Store, you can manage complex application states with minimal overhead and ensure type safety throughout your codebase.

## Installation

To install, you can add it to your project:

```bash
$ npm install @jupri-lab/store-core
```

## Usage

This section covers the usage of JupriLab Store in a comprehensive way.

### Instantiating the Store

A store typically has initialState and actions. Jupri Store supports asynchronous action without the need of adding middleware.

Here's what a store looks like.

```tsx
const userStore = new Store({
  initialState: {
    firstName: "John",
    lastName: "Doe",
    age: 27,
  },
  actions: {
    setFirstName: (state, payload: { firstName: string }) => ({
      ...state,
      firstName: payload.firstName,
    }),
    happyBirthday: (state) => ({
      ...state,
      age: state.age + 1,
    }),
    fetchUser: async (state) => {
      const result = await getUserService();
      return { ...result };
    },
  },
  name: "userStore",
});
```

### Accessing state using get

Store provides a way to access the state via `get` method which will return all properties of the state.

```tsx
const firstName = userStore.get().firstName;
```

### Dispatching action

To use the actions that you have created, Store provides a `dispatch` method for user to interact with the actions.

```tsx
// The first parameter is the action name and the second parameter will be the payload
userStore.dispatch("setFirstName", { firstName: "John" });

// Asynchronous action
userStore.dispatch("fetchUser");
```

### Subscribe

Subscribe to state changes to reactively update your UI or perform other side effects.

```tsx
const unsubscribe = userStore.subscribe((newState) => {
  console.log("State updated:", newState);
});
```

### Unsubscribe

Unsubscribe from state changes when you no longer need to listen for updates.

```tsx
const unsubscribe = userStore.subscribe((newState) => {
  console.log("State updated:", newState);
});

unsubscribe();

// OR

const subscriber = (newState) => console.log("State updated:", newState);

userStore.subscribe(subscriber);
userStore.unsubscribe(subscriber);
```

### Combining Stores

If you want to gather all of your stores into one single source of truth you can do that by using `CombineStores`.

```tsx
const userStore = new Store({});
const cartStore = new Store({});
// Combine the individual stores
// The key will be used to identify which store you want to interact via selector
const userCartStore = new CombineStores({
  user: userStore,
  cart: cartStore,
});

// Using the combined stores
const user = userCartStore.getStore((selector) => selector.user);
const cart = userCartStore.getStore((selector) => selector.cart);

user.dispatch("updateName", { firstName: "James" });
```

### Adding Middlewares

Middlewares allows you to perform additional operations or logic before the action reaches the reducer (or state updater) and modifies the state. Rules for middleware are the following:

- Middleware will be invoked during dispatch and before action.
- Store cannot contain duplicate middleware or in other word unique. Duplicated middleware will be automatically removed.
- Middleware should return `next()` function in order to finish the chain.

Here's an example of how you can create your own custom middleware.

```tsx
const logger: TMiddleware = ({ action, actionName, payload, state }, next) => {
  console.log("Dispatched action: ", action);
  console.log("Dispatched action name: ", actionName);
  console.log("Called with payload: ", payload);
  console.log("Current state: ", state);

  return next();
};

const myStore = new Store({
  middlewares: [logger],
});
```

## Key Features

- **Type-Safe:** Leverages TypeScript's type system to ensure type safety throughout state management operations.
- **Lightweight**: Minimal overhead and dependencies, making it suitable for projects of all sizes.
- **Versatile**: Supports complex state structures and a variety of state management patterns.
- **Easy Integration**: Simple API for defining states, actions, and subscribing to state changes.
- **Reactivity**: Allows reactive updates of UI components based on state changes.
