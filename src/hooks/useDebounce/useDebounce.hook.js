import { useState, useRef, useEffect } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const [debounceLoading, setDebounceLoading] = useState(true);
  const timerRef = useRef();
  useEffect(() => {
    setDebounceLoading(true);
    timerRef.current = setTimeout(() => {
      setDebounceLoading(false);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return { debouncedValue, debounceLoading };
};
