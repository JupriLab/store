# v0.1.0

- Created `Store` class to hold the states and actions

  - Users can further interact with the store via methods that are provided by the `Store` itself

    - `dispatch` method to dispatch actions
    - `get` to get all properties of state
    - `subscribe` when there is a change, the subscriber will be notified
    - `unsubscribe` to unsubscribe and will no longer receive notification

- Write test cases for `Store`
