import React, { useState, useCallback, useEffect } from "react";
import * as styles from "./search.module.css";
import { useDebounce } from "../../hooks";
import { fetchSearchData } from "../../service";

export const Search = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const { debouncedValue, debounceLoading } = useDebounce(searchedText, 1000);

  const searchData = useCallback(
    async (searchValue) => {
      setApiLoading(true);
      await fetchSearchData(searchValue);
      setApiLoading(false);
    },
    [debouncedValue]
  );
  useEffect(() => {
    console.log(apiLoading, 'this is api Loading , "D"D');
  }, [apiLoading]);

  useEffect(() => {
    searchData(debouncedValue);
  }, [debouncedValue, searchData]);

  const handleSearchTextChange = (event) => {
    setSearchedText(event.target.value);
    console.log(debounceLoading);
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
