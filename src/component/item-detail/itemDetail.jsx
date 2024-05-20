import React, { useState, useEffect } from "react";
import * as styles from "./itemDetail.module.css";
import DefaultItemImage from "./../../assets/DefaultItemImage.svg";
import AddImageIcon from "./../../assets/AddImage.svg";
import ChevronRightIconIcon from "./../../assets/ChevronRight.svg";

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
    <>
      <button
        onClick={() => setStillMounted(false)}
        className={`${styles.closeButton} 
          ${
            isMounted && stillMounted
              ? styles.bFadeIn
              : !stillMounted
                ? styles.bFadeOut
                : styles.buttonHidden
          }
        `}
      >
        <img src={ChevronRightIconIcon} width="25px" height="25px" />
      </button>

      <div
        className={`${styles.container} 
          ${
            isMounted && stillMounted
              ? styles.cFadeIn
              : !stillMounted
                ? styles.cFadeOut
                : styles.containerHidden
          }
        `}
      >
        <img
          className={styles.image}
          src={item?.image || DefaultItemImage}
        ></img>
        <div className={styles.addImageButtonContainer}>
          <button className={styles.addImageButton}>
            <span>افزودن تصویر</span>
            <img width="20px" src={AddImageIcon} />
          </button>
        </div>
      </div>
    </>
  );
};
