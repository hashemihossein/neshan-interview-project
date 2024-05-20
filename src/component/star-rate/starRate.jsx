import React, { useState, useEffect } from "react";

import StarIcon from "./../../assets/Star.svg";
import StarFillIcon from "./../../assets/StarFill.svg";

import * as styles from "./starRate.module.css";

export const StarRate = () => {
  const [rate, setRate] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    const randomRating = Math.floor(Math.random() * 6);
    const randomCount = Math.floor(Math.random() * 1000);
    setRate(randomRating);
    setCount(randomCount);
  }, []);

  const toPersianNumber = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(number).replace(/\d/g, (digit) => persianDigits[digit]);
  };

  return (
    <div className={styles.rateContainer}>
      <span className={styles.text}>{toPersianNumber(rate)}</span>

      <div>
        {[...Array(5)].map((star, index) => (
          <span key={index}>
            {index < rate ? (
              <img width={"12px"} alt="StarFillIcon" src={StarFillIcon} />
            ) : (
              <img width={"12px"} alt="StarIcon" src={StarIcon} />
            )}
          </span>
        ))}
      </div>
      <span className={styles.text}>{toPersianNumber(count)} رای</span>
    </div>
  );
};
