import React from "react";
import styles from "./KoiFish.module.css";

const Fish = ({ reversed = false }) => {
  return (
    <div className={`${styles.fish} ${reversed ? styles.reverse : ""}`}>
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className={styles.koiCoil}></div>
      ))}
    </div>
  );
};

const KoiFish = () => {
  return (
    <div className={styles.wrapper}>
      <Fish />
      <Fish reversed />
      <div className={styles.seaLevel}></div>
    </div>
  );
};

export default KoiFish;
