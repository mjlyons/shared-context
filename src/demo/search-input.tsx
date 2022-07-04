import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import {
  LocalMutators,
  StoreState,
  useLocalMutator,
  useLocalStoreState,
} from '../shared-context/local-store/store';

const ConnectedSearchInput = ({
  query,
  setQuery,
  resetQuery,
}: {
  query: StoreState['query'];
  setQuery: LocalMutators['setQuery'];
  resetQuery: LocalMutators['resetQuery'];
}) => {
  const [inputText, setInputText] = useState<string | null>(query);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      setInputText(evt.currentTarget.value);
    },
    [setInputText]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      if (evt.key === 'Enter') {
        console.log('Submit!');
        setQuery({ query: inputText });
      }
    },
    [setQuery, inputText]
  );

  // Sets query input to active query if the query changes elsewhere
  useEffect(() => {
    setInputText(query);
  }, [setInputText, query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Repository"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputText ?? ''}
      />
      <button onClick={resetQuery}>Reset</button>
      <div>Current Query: {query}</div>
    </div>
  );
};

export const SearchInput = () => {
  const localStoreState = useLocalStoreState();
  const setQuery = useLocalMutator('setQuery');
  const resetQuery = useLocalMutator('resetQuery');

  if (!localStoreState) {
    return <div>ERROR: Forgot to use local store provider</div>;
  }

  return (
    <ConnectedSearchInput
      query={localStoreState?.query}
      setQuery={setQuery}
      resetQuery={resetQuery}
    />
  );
};
