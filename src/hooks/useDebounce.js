import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Agar user delay se pehle phir type karega toh purana timeout clear ho jayega
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};