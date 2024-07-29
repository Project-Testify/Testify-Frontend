import { useState } from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
  // Get the initial value from session storage or use the initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading session storage', error);
      return initialValue;
    }
  });

  // Function to set the value in session storage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting session storage', error);
    }
  };

  return [storedValue, setValue] as const;
}
