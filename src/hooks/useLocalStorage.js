import { useEffect, useState } from 'react';
import { readStorageValue, writeStorageValue } from '../utils/storage.js';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorageValue(key, initialValue));

  useEffect(() => {
    writeStorageValue(key, value);
  }, [key, value]);

  return [value, setValue];
}
