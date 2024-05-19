import React, { useState, useCallback, useEffect } from "react";
import * as styles from "./search.module.css";
import { useDebounce } from "../../hooks";

export const Search = () => {
  const [focused, setFocused] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const debouncedValue = useDebounce(searchedText, 1000);

  const DSearch = useCallback(async () => {
    const res = await fetch(
      `https://demo.dataverse.org/api/search?q=${debouncedValue}`
    );
    const json = await res.json();
    console.log(json);
  }, [debouncedValue]);

  useEffect(() => {
    DSearch();
  }, [debouncedValue, DSearch]);

  const handleSearchTextChange = (event) => {
    setSearchedText(event.target.value);
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
