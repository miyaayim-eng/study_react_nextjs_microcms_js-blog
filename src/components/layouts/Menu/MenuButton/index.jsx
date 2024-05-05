"use client";
import { useState } from "react";

import styles from "./index.module.scss";

export const MenuButton = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuFunction = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <button type="button" className={styles.button} onClick={menuFunction}>
      <span
        className={openMenu ? `${styles.box} ${styles.box__open}` : styles.box}
      >
        <span
          className={
            openMenu ? `${styles.bar} ${styles.bar__open}` : styles.bar
          }
        ></span>
        <span
          className={
            openMenu ? `${styles.bar} ${styles.bar__open}` : styles.bar
          }
        ></span>
        <span
          className={
            openMenu ? `${styles.bar} ${styles.bar__open}` : styles.bar
          }
        ></span>
      </span>
    </button>
  );
};
