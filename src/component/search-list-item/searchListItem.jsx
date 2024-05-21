import React, { useState, useContext } from "react";
import * as styles from "./searchListItem.module.css";
import RoutingIcon from "./../../assets/Routing.svg";
import { ItemDetail, StarRate } from "..";
import { mapServices } from "../../service";
import { mapContext } from "../../context";

export const SearchListItem = (props) => {
  const { map } = useContext(mapContext);
  const [detailPageExpanded, setDetailPageExpanded] = useState(false);

  const { item, index } = props;

  return (
    <li className={styles.container}>
      <div className={styles.rowContainer}>
        <button
          onClick={() => {
            mapServices.mapFlyTo(map, [item?.location?.x, item?.location?.y]);
            setDetailPageExpanded(true);
          }}
          className={styles.containerButton}
        >
          <div>
            <div className={styles.title}>{item?.title}</div>
            <StarRate />
            <div className={styles.category}>{item?.type}</div>
            <div className={styles.address}>{item?.address}</div>
          </div>
        </button>
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
