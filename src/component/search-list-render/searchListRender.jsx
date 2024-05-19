import React from "react";
import * as styles from "./searchListRender.module.css";
import SpinnerSvg from "../../assets/SpinnerSvg.svg";

export const SearchListRender = ({ data, emptySearchText, loading }) => {
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
        return <div className={styles.spinnerContainer}>موردی یافت نشد</div>;
      },
    },
    {
      value: true,
      RenderComponent: () => {
        return (
          <ul>
            {data?.items?.map((item, index) => {
              console.log(item, index, "D:D:D:D:");
              return (
                <li>
                  <div>item {index}</div>;
                </li>
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
      <div class="1" style={{ overflow: "auto", paddingBottom: "60vh" }}>
        {conditionRendering[
          conditionRendering.findIndex((item) => item.value === true)
        ].RenderComponent()}
      </div>
    </div>
  );
};
