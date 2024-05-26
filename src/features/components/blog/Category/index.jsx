import Link from "next/link";
import styles from "./index.module.scss";

export const Category = async ({ category, isCurrent }) => {
  // コンテンツを生成するための関数
  const categoryContent = (
    <>
      <svg className={styles.icon}>
        <use href="#svg-category" />
      </svg>
      <span className={styles.name}>{category.name}</span>
      {/* totalCountが存在し、nullでもない場合のみ、countを表示 */}
      {category.totalCount !== undefined && category.totalCount !== null && (
        <span className={styles.count}>{category.totalCount}</span>
      )}
    </>
  );

  // isCurrentがtrueの場合はspanタグ、それ以外はLinkタグを使用
  if (isCurrent) {
    return (
      <span className={`${styles.link} ${styles.current}`}>
        {categoryContent}
      </span>
    );
  } else {
    return (
      <Link href={`/category/${category.id}`} className={styles.link}>
        {categoryContent}
      </Link>
    );
  }
};
