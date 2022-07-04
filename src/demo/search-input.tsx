import { ChangeEventHandler, KeyboardEventHandler, useCallback, useState } from 'react';
import { useLocalStore } from '../shared-context/local-store/store';

export const SearchInput = () => {
  const localStore = useLocalStore();

  const [inputText, setInputText] = useState<string | null>(localStore?.storeState.query ?? null);

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
        localStore?.updateStoreState({ query: inputText }); // TODO: this should happen by dispatch fn (update rather than full overwrite)
        // setSubmittedText(inputText);
      }
    },
    [localStore, inputText]
  );

  if (!localStore) {
    return <div>ERROR: forgot to use local store provider</div>;
  }

  return (
    <div>
      <input
        type="search"
        placeholder="Repository"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputText ?? ''}
      />
      <div>Current Query: {localStore.storeState.query}</div>
    </div>
  );
};
