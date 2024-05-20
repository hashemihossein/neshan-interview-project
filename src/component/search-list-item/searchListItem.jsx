import React from "react";
import * as styles from "./searchListItem.module.css";
import RoutingIcon from "./../../assets/RoutingIcon.svg";

export const SearchListItem = (props) => {
  const { item, index } = props;
  return (
    <li className={styles.container}>
      <div className={styles.rowContainer}>
        <div>
          <div className={styles.title}>{item?.title}</div>
          <div className={styles.category}>{item?.category}</div>
          <div className={styles.address}>{item?.address}</div>
        </div>
        <button type="button" className={styles.buttonContainer}>
          <img width={"22px"} alt="RoutingIcon" src={RoutingIcon} />
        </button>
      </div>
      <div className={styles.hr} />
    </li>
  );
};
