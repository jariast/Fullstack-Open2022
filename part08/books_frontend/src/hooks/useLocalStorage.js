import { useEffect, useRef, useState } from 'react';

function useLocalStorageState(
  key,
  defaultValue = '',
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const [state, setState] = useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage);
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  // Had to comment out this code because it was creating an issue with
  // the Apollo client context.

  // const prevKeyRef = useRef(key);

  // // Check the example at src/examples/local-state-key-change.js to visualize a key change
  // useEffect(() => {
  //   const prevKey = prevKeyRef.current;
  //   if (prevKey !== key) {
  //     window.localStorage.removeItem(prevKey);
  //   }
  //   prevKeyRef.current = key;
  //   window.localStorage.setItem(key, serialize(state));
  //   console.log('Set localstorage');
  // }, [key, state, serialize]);

  window.localStorage.setItem(key, serialize(state));

  return [state, setState];
}

export default useLocalStorageState;
