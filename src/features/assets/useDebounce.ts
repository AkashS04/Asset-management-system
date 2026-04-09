import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer); // cleanup previous timer
    };
  }, [value, delay]);

  return debouncedValue;
}