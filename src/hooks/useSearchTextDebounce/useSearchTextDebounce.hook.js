import { useState, useRef, useEffect } from "react";

export const useSearchTextDebounce = (value, delay = 500) => {
  const [debouncedSearchTextValue, setDebouncedSearchTextValue] = useState("");
  const [debounceSearchTextLoading, setDebounceSearchTextLoading] =
    useState(true);
  const timerRef = useRef();
  useEffect(() => {
    setDebounceSearchTextLoading(true);
    timerRef.current = setTimeout(() => {
      setDebounceSearchTextLoading(false);
      setDebouncedSearchTextValue(value);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return { debouncedSearchTextValue, debounceSearchTextLoading };
};
