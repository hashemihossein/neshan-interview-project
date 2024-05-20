import React from "react";
import * as styles from "./searchListRender.module.css";
import SpinnerSvg from "../../assets/SpinnerSvg.svg";
import { SearchListItem } from "..";

export const SearchListRender = (props) => {
  const { data, loading, emptySearchText } = props;
  const conditionRendering = [
    {
      value: emptySearchText,
      RenderComponent: () => {
        return <div className={styles.spinnerContainer}>لطفا بنویس</div>;
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
