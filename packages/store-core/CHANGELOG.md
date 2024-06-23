# June 23th 2024

- Created `MiddlewareManager` class for managing middlewares and applying middlewares.
  - Every middleware are unique, which mean there won't be any duplicated middleware even though the user inserted multiple duplicate middlewares.
  - Middleware should return next, if not then the chain will be broken and cannot finish.
- Refactor apply from recursive to loop.
- `Store` checks middleware chain status before invoked. If chain failed then action won't be invoked.
- Created `NextFunction` type

# June 22th 2024

- Created `TMiddleware` for the base type of creating and applying middleware
- `Store` accepts middlewares as optional configuration.

# v0.2.0

- Created new `CombineStore` class for combining multiple individual stores to have a single source of truth.
  - User can then select which store they want to interact with via `getStore`
  - TypeSafety to ensure users don't interact with a non-existent store.
- Upgraded TypeScript to v5.5.2.
- Improved `dispatch` second parameter type using tuples.
  - The second parameter now depends fully on the actions. If the action has payload and the user is dispatching that action, then it will ask for a second parameter and vice versa.
- Updated store test cases.
- Created test cases for `CombineStore`.
- Update some `package.json` properties

# v0.1.1

- Removed `getOne` and fully rely on `get`.

# v0.1.0

- Created `Store` class to hold the states and actions

  - Users can further interact with the store via methods that are provided by the `Store` itself

    - `dispatch` method to dispatch actions
    - `get` to get all properties of state
    - `subscribe` when there is a change, the subscriber will be notified
    - `unsubscribe` to unsubscribe and will no longer receive notification

- Write test cases for `Store`
