# JupriLab Store

A lightweight, type-safe, and versatile state management solution designed for simplicity and ease of integration. It provides a straightforward API for defining initial states, actions to modify state, and subscribing to state changes. With Store, you can manage complex application states with minimal overhead and ensure type safety throughout your codebase.

## Installation

To install, you can add it to your project:

```bash
$ npm install your-package-name
```

## Usage

This section covers the usage of JupriLab Store in a comprehensive way.

### Instantiating the Store

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

## Key Features

- **Type-Safe:** Leverages TypeScript's type system to ensure type safety throughout state management operations.
- **Lightweight**: Minimal overhead and dependencies, making it suitable for projects of all sizes.
- **Versatile**: Supports complex state structures and a variety of state management patterns.
- **Easy Integration**: Simple API for defining states, actions, and subscribing to state changes.
- **Reactivity**: Allows reactive updates of UI components based on state changes.
