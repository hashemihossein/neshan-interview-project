import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import * as styles from "./sidebar.module.css";
import {
  useSearchCoordinatesDebounce,
  useSearchTextDebounce,
} from "../../hooks";
import { fetchSearchData, searchHistoryServices } from "../../service";
import { mapContext, toastContext } from "../../context";
import { SidebarContentRender } from "..";
import { searchContext } from "../../context";
import HamburgerIcon from "./../../assets/Hamburger.svg";
import SearchIcon from "./../../assets/Search.svg";
import CrossIcon from "./../../assets/Cross.svg";

export const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const searchTextInput = useRef(null);
  const { lat, lng } = useContext(mapContext);
  const { addToast } = useContext(toastContext);
  const {
    searchResult,
    setSearchResult,
    searchedText,
    setSearchedText,
    apiLoading,
    setApiLoading,
  } = useContext(searchContext);

  const { debouncedSearchTextValue, debounceSearchTextLoading } =
    useSearchTextDebounce(searchedText, 1000);

  const searchData = useCallback(
    async (searchValue) => {
      setApiLoading(true);
      try {
        const result = await fetchSearchData(lat, lng, searchValue);
        setSearchResult(result);
      } catch (error) {
        addToast("خطا در ارتباط با سرور", "error");
        setSearchResult([]);
      }

      setApiLoading(false);
    },
    [debouncedSearchTextValue]
  );

  useEffect(() => {
    searchData(debouncedSearchTextValue);
  }, [debouncedSearchTextValue, searchData]);

  const handleSearchTextChange = (event) => {
    setSearchedText(event.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.inputPaddingContainer}>
        <div
          style={{
            boxShadow: expanded
              ? "none"
              : "0px 0px 10px 1px rgb(141, 141, 141)",
          }}
          className={styles.inputContainer}
        >
          <img width="12px" height="20px" src={HamburgerIcon} />
          <input
            className={styles.input}
            type="text"
            ref={searchTextInput}
            onFocus={() => {
              if (expanded === false) {
                setExpanded(true);
              }
            }}
            value={searchedText}
            onChange={handleSearchTextChange}
          />
          <button
            className={styles.iconButton}
            onClick={() => {
              searchHistoryServices.add(searchedText);
              searchTextInput.current.blur();
            }}
          >
            <img width="20px" height="20px" src={SearchIcon} />
          </button>
          <div className={styles.verticalLine} />
          <button
            className={styles.iconButton}
            onClick={() =>
              searchedText === "" ? setExpanded(false) : setSearchedText("")
            }
          >
            <img width="20px" height="20px" src={CrossIcon} />
          </button>
        </div>
      </div>
      <div
        style={{
          height: expanded ? "100vh" : "0px",
          boxShadow: expanded ? "0px 0px 10px 1px rgb(141, 141, 141)" : "none",
        }}
        className={styles.contentContainer}
      >
        <div className={styles.expandedView}>
          <div className={styles.topPadding}></div>
          <SidebarContentRender
            data={searchResult}
            loading={apiLoading || debounceSearchTextLoading}
            emptySearchText={searchedText == ""}
          />
        </div>
      </div>
    </div>
  );
};
