import styles from "./index.module.scss";
import formatDate from "@/libs/formatDate";

export const DateCreated = async ({ article }) => {
  return (
    <time className={styles.date} dateTime={article.createdAt}>
      <svg className={styles.date__icon__calendar}>
        {/* <use href="#svg-calendar-month" /> */}
        <use href="#svg-pencil" />
      </svg>
      <span className={styles.date__text}>{formatDate(article.createdAt)}</span>
    </time>
  );
};
