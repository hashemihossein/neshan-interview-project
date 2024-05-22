import React from "react";
import * as styles from "./searchContentRender.module.css";
import SpinnerSvg from "../../assets/SpinnerSvg.svg";
import CrossIcon from "../../assets/Cross.svg";
import { SearchListItem } from "..";
import { searchHistoryServices } from "../../service";

export const SearchContentRender = (props) => {
  const { data, loading, emptySearchText } = props;
  const searchHistory = searchHistoryServices.get();

  const conditionRendering = [
    {
      value: emptySearchText,
      RenderComponent: () => {
        return (
          <div className={styles.searchHistoryContainer}>
            {searchHistory.length === 0 ? (
              <span>تاریخچه جستجوی شما در اینجا نمایش داده خواهد شد</span>
            ) : (
              <>
                <div className={styles.searchHistoryText}>تاریخچه جستجو</div>

                {searchHistory.map((searchItem, index) => {
                  return (
                    <div
                      key={`${searchItem}--${index}`}
                      className={styles.searchHistoryItemContainer}
                    >
                      <span>{searchItem}</span>
                      <button>
                        <img width="20px" height="20px" src={CrossIcon} />
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
                  index={index}
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
