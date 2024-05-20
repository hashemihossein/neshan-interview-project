import React, { useState, useCallback, useEffect, useContext } from "react";
import * as styles from "./search.module.css";
import {
  useSearchCoordinatesDebounce,
  useSearchTextDebounce,
} from "../../hooks";
import { fetchSearchData } from "../../service";
import { mainContext } from "../../context";
import { SearchListRender } from "..";
import { restClient } from "./../../instances";
import { searchContext } from "../../context";

export const Search = () => {
  const [expanded, setExpanded] = useState(false);

  const { lat, lng } = useContext(mainContext);
  const {
    searchResult,
    setSearchResult,
    searchedText,
    setSearchedText,
    apiLoading,
    setApiLoading,
  } = useContext(searchContext);

  useEffect(() => {
    console.log("lat , long changed to ", lat, lng);
  }, [lat, lng]);

  const { debouncedLat, debouncedLng } = useSearchCoordinatesDebounce(
    lat,
    lng,
    1000
  );

  const { debouncedSearchTextValue, debounceSearchTextLoading } =
    useSearchTextDebounce(searchedText, 1000);

  const searchData = useCallback(
    async (searchValue) => {
      setApiLoading(true);
      const result = await fetchSearchData(searchValue);
      setSearchResult(result);
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
    <div className={styles.mainContainer}>
      <div
        style={{
          height: expanded ? "100vh" : "4rem",
        }}
        className={styles.contentContainer}
      >
        <div className={styles.expandedView}>
          <div className={styles.inputContainer}>
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
          <SearchListRender
            data={searchResult}
            loading={apiLoading || debounceSearchTextLoading}
            emptySearchText={searchedText == ""}
          />
        </div>
      </div>
    </div>
  );
};
