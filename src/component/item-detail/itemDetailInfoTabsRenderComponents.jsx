import React, { useState } from "react";
import * as styles from "./itemDetailInfoTabsRenderComponents.module.css";
import RoutingIcon from "../../assets/Routing.svg";
import CallIcon from "../../assets/Call.svg";
import BookmarkIcon from "../../assets/Bookmark.svg";
import ShareIcon from "../../assets/Share.svg";
import LocationPinIcon from "../../assets/LocationPin.svg";
import ClockIcon from "../../assets/Clock.svg";
import WWWIcon from "../../assets/WWW.svg";
import StarIcon from "../../assets/Star.svg";
import StarFillIcon from "../../assets/StarFill.svg";

const StarRater = () => {
  const [mouseEnterIndex, setMouseEnterIndex] = useState(-1);
  return (
    <div className={styles.srContainer}>
      {[...Array(5)].map((star, index) => (
        <span
          onMouseEnter={() => setMouseEnterIndex(index)}
          onMouseLeave={() => setMouseEnterIndex(-1)}
          key={index}
          style={{ cursor: "pointer" }}
        >
          {index <= mouseEnterIndex ? (
            <img width={"30px"} alt="StarFillIcon" src={StarFillIcon} />
          ) : (
            <img width={"30px"} alt="StarIcon" src={StarIcon} />
          )}
        </span>
      ))}
    </div>
  );
};

export const PublicInformations = (props) => {
  const { region, neighbourhood, address } = props;
  const buttons = [
    {
      title: "مسیریابی",
      iconSrc: RoutingIcon,
      isPrimary: true,
      clickHandler: () => {},
    },
    {
      title: "تماس",
      iconSrc: CallIcon,
      isPrimary: false,
      clickHandler: () => {},
    },
    {
      title: "ذخیره",
      iconSrc: BookmarkIcon,
      isPrimary: false,
      clickHandler: () => {},
    },
    {
      title: "ارسال",
      iconSrc: ShareIcon,
      isPrimary: false,
      clickHandler: () => {},
    },
  ];

  const informationItems = [
    {
      iconSrc: LocationPinIcon,
      contentValue: () => (
        <span>{`${region}، ${neighbourhood}، ${address}`}</span>
      ),
    },
    {
      iconSrc: ClockIcon,
      contentValue: () => (
        <span>
          ساعت کاری: <span style={{ color: "#00CC9B" }}>باز است</span> ۹ تا ۱۷
        </span>
      ),
    },
    {
      iconSrc: CallIcon,
      contentValue: () => (
        <span>
          شماره تماس: <span style={{ color: "#1976D2" }}>۰۲۱-۸۴۳۷۸۴۹</span>
        </span>
      ),
    },
    {
      iconSrc: WWWIcon,
      contentValue: () => (
        <span>
          وبسایت:{" "}
          <span style={{ color: "#1976D2" }}>test.CompanyWebsite.com</span>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.piCointainer}>
      <div className={styles.piButtonsContainer}>
        {buttons.map((button) => (
          <div key={button.title} className={styles.piButtonContainer}>
            <button
              className={`${styles.piButtonBase} ${button.isPrimary ? styles.piPrimaryButton : styles.piNonPrimaryButton}`}
            >
              <img width={"25px"} height={"25px"} src={button.iconSrc} />
            </button>
            <span>{button.title}</span>
          </div>
        ))}
      </div>
      <div className={styles.piInformationItemsContainer}>
        {informationItems.map((item, index) => (
          <div key={index} className={styles.piInformationItemContainer}>
            <div className={styles.piInformationItemRowContainer}>
              <img width={"24px"} height={"24px"} src={item.iconSrc} />
              <div className={styles.piInformationItemContentContainer}>
                {item.contentValue()}
              </div>
            </div>
            {index < informationItems.length - 1 && (
              <div className={styles.piHr} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.piStarRaterContainer}>
        <div className={styles.piStarRaterText}>به این مکان امتیاز دهید</div>
        <StarRater />
      </div>
      <textarea placeholder="نظرتان را درباره این مکان بنویسید" />
    </div>
  );
};

export const Comments = (props) => {
  return <div>نظری در مورد این مکان ثبت نشده است</div>;
};

export const Images = (props) => {
  return <div>تصویری برای این مکان ثبت نشده است</div>;
};

export const About = (props) => {
  return <div>اطلاعاتی برای این مکان ثبت نشده است</div>;
};
