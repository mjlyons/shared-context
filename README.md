# shared-context

Demonstrates an app with remote and local state.

The app uses `react-query` to access remote state. In this case, pulling
information about `mjlyons`'s repos from github.

The app uses a (new) `simple-store` to store local state -- nothing from a server. `simple-store`
is inspired by Redux, but attempts to be as simple to use as possible.
It introduces "mutators" -- create a single typed function to handle and event
and update the store's state (rather than make an action, action creator, and reducer).

You can also access the store state with `useStoreState()` and any mutator with
`useMutator(mutatorName)`.

Intentionally does not have support for middleware in the spirit of keeping things simple.
