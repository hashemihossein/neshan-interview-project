import React, { useState, useCallback, useEffect, useContext } from "react";
import * as styles from "./search.module.css";
import {
  useSearchCoordinatesDebounce,
  useSearchTextDebounce,
} from "../../hooks";
import { fetchSearchData } from "../../service";
import { mainContext } from "../../context";

export const Search = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const { debouncedSearchTextValue, debounceSearchTextLoading } =
    useSearchTextDebounce(searchedText, 1000);
  const { lat, lng } = useContext(mainContext);
  const { debouncedLat, debouncedLng, debounceCoordinatesLoading } =
    useSearchCoordinatesDebounce(lat, lng, 1000);

  const searchData = useCallback(
    async (searchValue) => {
      setApiLoading(true);
      await fetchSearchData(searchValue);
      setApiLoading(false);
    },
    [debounceSearchTextLoading, debouncedLat, debouncedLng]
  );

  useEffect(() => {
    searchData(debounceSearchTextLoading);
  }, [debouncedSearchTextValue, debouncedLat, debouncedLng, searchData]);

  const handleSearchTextChange = (event) => {
    setSearchedText(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.inputContainer}
        style={{
          height: expanded ? "100vh" : "3rem",
        }}
      >
        <input
          className={styles.input}
          type="text"
          onFocus={() => {
            if (expanded === false) {
              setExpanded(true);
            }
          }}
          onChange={handleSearchTextChange}
        />
      </div>
    </div>
  );
};
