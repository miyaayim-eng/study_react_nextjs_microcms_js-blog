import "./toc.scss";
import styles from "./index.module.scss";
import { Toc } from "@/libs/tocbot";

export const ArticleToc = () => {
  return (
    <>
      <p className={styles.title}>
        <svg className={styles.title__icon}>
          <use href="#svg-list" />
        </svg>
        <span className={styles.title__text}>目次</span>
      </p>
      <Toc />
    </>
  );
};
