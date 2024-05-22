import React, { useState, useEffect, useContext } from "react";
import * as styles from "./itemDetail.module.css";
import { StarRate } from "..";
import {
  PublicInformations,
  Comments,
  Images,
  About,
} from "./itemDetailInfoTabsRenderComponents.jsx";
import DefaultItemImage from "./../../assets/DefaultItemImage.svg";
import AddImageIcon from "./../../assets/AddImage.svg";
import ChevronRightIcon from "./../../assets/ChevronRight.svg";
import CategoryIcon from "./../../assets/Category.svg";
import CarIcon from "./../../assets/Car.svg";
import { convertToGeoJSON } from "../../utils/convert-to-geo-json/convertToGeoJson.utils";
import { mapServices } from "../../service";
import { searchContext, mapContext } from "../../context";

export const ItemDetail = (props) => {
  const { map } = useContext(mapContext);
  const { searchResult } = useContext(searchContext);
  const [isMounted, setIsMounted] = useState(false);
  const [stillMounted, setStillMounted] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const { setUnmount, item, index } = props;
  const infoTabs = [
    {
      id: 0,
      title: "اطلاعات عمومی",
      renderComponent: (props) => <PublicInformations {...props} />,
    },
    {
      id: 1,
      title: "نظرات",
      renderComponent: (props) => <Comments {...props} />,
    },
    {
      id: 2,
      title: "تصاویر",
      renderComponent: (props) => <Images {...props} />,
    },
    {
      id: 3,
      title: "درباره",
      renderComponent: (props) => <About {...props} />,
    },
  ];

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

  const DynamicTabContentRenderer = () => {
    return infoTabs
      .filter((target) => target?.id === selectedTab)[0]
      .renderComponent(item);
  };

  return (
    <>
      <button
        onClick={() => {
          const geojsonData = convertToGeoJSON(searchResult?.items);
          mapServices.setMapLayer(map, geojsonData);
          setStillMounted(false);
        }}
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
        <img src={ChevronRightIcon} width="25px" height="25px" />
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
        <div className={styles.generalInfoContainer}>
          <div className={styles.titleRowContainer}>
            <div className={styles.categoryImageContainer}>
              <img src={CategoryIcon} />
            </div>
            <div className={styles.titleViewContainer}>
              <span className={styles.title}>{item?.title}</span>
              <span className={styles.type}>{item?.type}</span>
            </div>
          </div>
          <div className={styles.distanceInfoContainer}>
            <img src={CarIcon}></img>
            <span>۱۲ دقیقه</span>
            <StarRate />
          </div>
        </div>
        <div className={styles.hr} />
        <ul>
          <div className={styles.infoTabContainer}>
            {infoTabs.map((item) => {
              const isSelected = selectedTab === item?.id;
              return (
                <li key={item?.id}>
                  <button
                    onClick={() => {
                      setSelectedTab(item?.id);
                    }}
                    style={{
                      border: isSelected
                        ? "2px solid #1976d2"
                        : "1px solid rgb(190,190,190)",
                    }}
                    className={styles.infoTabsItemButton}
                  >
                    <span
                      style={{
                        color: isSelected ? "#1976d2" : "black",
                        fontFamily: isSelected ? "Vazir-Bold" : "Vazir",
                      }}
                    >
                      {item?.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </div>
        </ul>
        <div className={styles.hr} />
        <div style={{ padding: "20px" }}>
          <DynamicTabContentRenderer />
        </div>
      </div>
    </>
  );
};
