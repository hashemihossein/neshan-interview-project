import React, { useState, useCallback, useEffect, useContext } from "react";
import * as styles from "./search.module.css";
import {
  useSearchCoordinatesDebounce,
  useSearchTextDebounce,
} from "../../hooks";
import { fetchSearchData } from "../../service";
import { mainContext } from "../../context";
import { SearchListRender } from "..";

export const Search = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [apiLoading, setApiLoading] = useState(false);

  const { lat, lng } = useContext(mainContext);

  const { debouncedLat, debouncedLng } = useSearchCoordinatesDebounce(
    lat,
    lng,
    1000
  );
  const { debouncedSearchTextValue, debounceSearchTextLoading } =
    useSearchTextDebounce(searchedText, 1000);
  const [searchResult, setSearchResult] = useState({});

  const searchData = useCallback(
    async (searchValue) => {
      setApiLoading(true);
      const result = await fetchSearchData(searchValue);
      setSearchResult(result?.data);
      setApiLoading(false);
    },
    [debouncedSearchTextValue, debouncedLat, debouncedLng]
  );

  useEffect(() => {
    searchData(debouncedSearchTextValue);
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
        <SearchListRender
          data={searchResult}
          loading={apiLoading || debounceSearchTextLoading}
        />
      </div>
    </div>
  );
};
