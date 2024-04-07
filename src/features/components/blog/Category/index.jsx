import Link from "next/link";
import styles from "./index.module.scss";

export const Category = async ({
  categoryId,
  categoryName,
  currentCategory,
}) => {
  return (
    <>
      {currentCategory !== categoryId ? (
        <Link href={`/category/${categoryId}`} className={styles.link}>
          <svg className={styles.icon}>
            <use href="#svg-category" />
          </svg>
          <span className={styles.text}>{categoryName}</span>
        </Link>
      ) : (
        <span className={`${styles.link} ${styles.current}`}>
          <svg className={styles.icon}>
            <use href="#svg-category" />
          </svg>
          <span className={styles.text}>{categoryName}</span>
        </span>
      )}
    </>
  );
};
