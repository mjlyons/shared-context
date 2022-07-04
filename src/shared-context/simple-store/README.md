# simple-store

simple-store is a Redux-like store that attempts to have the lowest learning curve possible.

It introduces "mutators" which combine actions/action-creators, dispatch, and reducers.
This cuts down on boilerplate -- define a mutator function for the change you want to support
in one place.

Although you can use `useMutator` and `useStoreState` in the components that use this data,
it's recommended that you create a wrapper component to access the store. This will prevent
your component from updating every time anything in the store changes and avoid performance
issues.

Note that `simple-store` contains the generic store support; `local-store` contains the store
state shape and mutators _for this demo_.

Treat this as a separate package, it may become one.
