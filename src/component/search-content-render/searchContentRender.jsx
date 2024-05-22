import React, { useContext } from "react";
import * as styles from "./searchContentRender.module.css";
import SpinnerSvg from "../../assets/SpinnerSvg.svg";
import SearchIcon from "../../assets/Search.svg";
import { SearchListItem } from "..";
import { searchHistoryServices } from "../../service";
import { searchContext } from "../../context";

export const SearchContentRender = (props) => {
  const { data, loading, emptySearchText } = props;
  const { setSearchedText } = useContext(searchContext);
  const conditionRendering = [
    {
      value: emptySearchText,
      RenderComponent: () => {
        const searchHistory = searchHistoryServices.get();

        return (
          <div className={styles.searchHistoryContainer}>
            {searchHistory.length === 0 ? (
              <div style={{ textAlign: "center", fontSize: "14px" }}>
                تاریخچه جستجوی شما در اینجا نمایش داده خواهد شد
              </div>
            ) : (
              <>
                <div className={styles.searchHistoryText}>تاریخچه جستجو</div>

                {searchHistory.map((searchItem, index) => {
                  return (
                    <div key={`${searchItem}--${index}`}>
                      <button
                        onClick={() => {
                          setSearchedText(searchItem);
                        }}
                        className={styles.searchHistoryItemButton}
                      >
                        <span>{searchItem}</span>
                        <img width="20px" height="20px" src={SearchIcon} />
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        );
      },
    },
    {
      value: loading,
      RenderComponent: () => {
        return (
          <div className={styles.spinnerContainer}>
            <img width={"30px"} src={SpinnerSvg} />
          </div>
        );
      },
    },
    {
      value: data?.count === 0,
      RenderComponent: () => {
        return <div className={styles.notFoundContainer}>موردی یافت نشد</div>;
      },
    },
    {
      value: true,
      RenderComponent: () => {
        return (
          <ul>
            {data?.items?.map((item, index) => {
              return (
                <SearchListItem
                  key={String(item.location.x + item.location.y)}
                  item={item}
                />
              );
            })}
          </ul>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      {/* fix this */}
      <div style={{ overflow: "auto", paddingBottom: "60vh" }}>
        {conditionRendering[
          conditionRendering.findIndex((item) => item.value === true)
        ].RenderComponent()}
      </div>
    </div>
  );
};
