import { useRef, useCallback } from 'react';

export const useThrottle = (callback, delay) => {
  const lastCall = useRef(0); // we store the timestamp of the last call in a ref, so it persists across renders without causing re-renders

  return useCallback((...args) => {
    const now = new Date().getTime();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      callback(...args);
    }
  }, [callback, delay]);
};