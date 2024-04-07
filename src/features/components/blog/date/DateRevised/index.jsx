import styles from "./index.module.scss";
import formatDate from "@/libs/formatDate";

export const DateRevised = async ({ article }) => {
  return (
    <time className={styles.date} dateTime={article.revisedAt}>
      <svg className={styles.date__icon__update}>
        <use href="#svg-refresh" />
      </svg>
      <span className={styles.date__text}>{formatDate(article.revisedAt)}</span>
    </time>
  );
};
