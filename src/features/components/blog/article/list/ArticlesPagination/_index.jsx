import Link from "next/link";
import { LIMIT } from "@/constants";
import styles from "./index.module.scss";

export const ArticlesPagination = ({
  totalCount,
  currentPage = 1,
  basePath = "",
}) => {
  // ページ数を取得
  // 例：[1, 2, 3, 4]
  const pages = Array.from({ length: Math.ceil(totalCount / LIMIT) }).map(
    (_, i) => i + 1
  );

  // console.log("totalCount => ", totalCount);
  // console.log("currentPage => ", currentPage);
  // console.log("pages => ", pages);

  return (
    <>
      <ul className={styles.list}>
        {pages.map((page) => (
          <li className={styles.item} key={page}>
            {currentPage !== page ? (
              <Link href={`${basePath}/page/${page}`} className={styles.link}>
                {page}
              </Link>
            ) : (
              <span className={`${styles.link} ${styles.current}`}>{page}</span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
