import React, { useState } from "react";
import * as styles from "./searchListItem.module.css";
import RoutingIcon from "./../../assets/Routing.svg";
import { ItemDetail, StarRate } from "..";

export const SearchListItem = (props) => {
  const [detailPageExpanded, setDetailPageExpanded] = useState(false);

  const { item, index } = props;

  return (
    <li className={styles.container}>
      <div className={styles.rowContainer}>
        <button
          onClick={() => setDetailPageExpanded(true)}
          className={styles.containerButton}
        >
          <div>
            <div className={styles.title}>{item?.title}</div>
            <StarRate />
            <div className={styles.category}>{item?.type}</div>
            <div className={styles.address}>{item?.address}</div>
          </div>
        </button>

        {/* <button type="button" className={styles.buttonContainer}>
          <img width={"22px"} alt="RoutingIcon" src={RoutingIcon} />
        </button> */}
      </div>

      <div className={styles.hr} />

      {detailPageExpanded && (
        <ItemDetail
          setUnmount={() => setDetailPageExpanded(false)}
          item={item}
          index={index}
        />
      )}
    </li>
  );
};
