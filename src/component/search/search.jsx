import React, { useState, useCallback, useEffect } from "react";
import * as styles from "./search.module.css";
import { useDebounce } from "../../hooks";

export const Search = () => {
  const [focused, setFocused] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const { debouncedValue, debounceLoading } = useDebounce(searchedText, 1000);

  const searchData = useCallback(async (searchValue) => {}, [debouncedValue]);

  useEffect(() => {
    searchData(debouncedValue);
  }, [debouncedValue, searchData]);

  const handleSearchTextChange = (event) => {
    setSearchedText(event.target.value);
    console.log(loading);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.inputContainer}
        style={{
          height: focused ? "100vh" : "3rem",
        }}
      >
        <input
          className={styles.input}
          type="text"
          onFocus={() => {
            setFocused(true);
          }}
          onChange={handleSearchTextChange}
        />
      </div>
    </div>
  );
};
