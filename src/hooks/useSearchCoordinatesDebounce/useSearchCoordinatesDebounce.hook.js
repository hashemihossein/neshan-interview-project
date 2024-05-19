import { useState, useRef, useEffect } from "react";

export const useSearchCoordinatesDebounce = (lat, lng, delay = 500) => {
  const [debouncedLat, setDebouncedLat] = useState("");
  const [debouncedLng, setDebouncedLng] = useState("");
  const [debounceCoordinatesLoading, setDebounceCoordinatesLoading] =
    useState(true);
  const timerRef = useRef();

  useEffect(() => {
    setDebounceCoordinatesLoading(true);
    timerRef.current = setTimeout(() => {
      setDebounceCoordinatesLoading(false);
      setDebouncedLat(lat);
      setDebouncedLng(lng);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [lat, lng, delay]);

  return { debouncedLat, debouncedLng, debounceCoordinatesLoading };
};
