import React, { useState, useEffect } from "react";
import * as styles from "./itemDetail.module.css";

export const ItemDetail = (props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [stillMounted, setStillMounted] = useState(true);
  const { setUnmount, item, index } = props;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!stillMounted) {
      let timeout = setTimeout(() => {
        setUnmount();
        clearTimeout(timeout);
      }, 500);
    }
  }, [stillMounted]);

  return (
    <div
      className={
        isMounted && stillMounted
          ? styles.containerFadeIn
          : !stillMounted
            ? styles.containerFadeOut
            : styles.containerHidden
      }
    >
      <button onClick={() => setStillMounted(false)}></button>
      itemDetail
    </div>
  );
};
