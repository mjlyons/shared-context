import { ChangeEventHandler, KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import { useLocalStore } from '../shared-context/local-store/store';

const ConnectedSearchInput = ({
  query,
  setQuery,
  resetQuery,
}: {
  query: string | null;
  setQuery: (query: string | null) => void;
  resetQuery: () => void;
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
        setQuery(inputText);
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
  const localStore = useLocalStore();

  const setQuery = useCallback(
    (query: string | null) => localStore?.mutate('setQuery', { query }),
    [localStore]
  );

  const resetQuery = useCallback(() => localStore?.mutate('resetQuery', {}), [localStore]);

  if (!localStore) {
    return <div>ERROR: Forgot to use local store provider</div>;
  }

  return (
    <ConnectedSearchInput
      query={localStore?.storeState.query}
      setQuery={setQuery}
      resetQuery={resetQuery}
    />
  );
};
