import Link from "next/link";
import styles from "./index.module.scss";

export const Category = async ({
  categoryId,
  categoryName,
  currentCategory,
  currentPage,
}) => {
  // "current" というクラス名を条件に応じて付与するための関数
  // 2ページ目以降のカテゴリページはカレント表示になるが、クリックできるようにするために作成
  let linkClass = styles.link;
  if (currentCategory === categoryId) {
    linkClass = `${styles.link} ${styles.current}`;
  }

  return (
    <>
      {currentCategory !== categoryId || currentPage ? (
        <Link href={`/category/${categoryId}`} className={linkClass}>
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
