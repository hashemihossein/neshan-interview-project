import { useState, useRef, useEffect } from "react";

export const useSearchCoordinatesDebounce = (lat, lng, delay = 500) => {
  const [debouncedLat, setDebouncedLat] = useState("");
  const [debouncedLng, setDebouncedLng] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedLat(lat);
      setDebouncedLng(lng);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [lat, lng, delay]);

  return { debouncedLat, debouncedLng };
};
