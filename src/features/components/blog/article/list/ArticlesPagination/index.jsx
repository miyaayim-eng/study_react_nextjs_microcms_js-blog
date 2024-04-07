import Link from "next/link";
import styles from "./index.module.scss";
import { LIMIT } from "@/constants";

export const ArticlesPagination = ({
  totalCount,
  currentPage = 1,
  basePath = "",
}) => {
  // 全ページ数を計算
  const totalPages = Math.ceil(totalCount / LIMIT);

  // 表示するページ番号のリストを計算
  let pagesToShow;
  if (currentPage <= 4) {
    // 1ページ目から4ページ目の場合、先頭から5ページを表示
    pagesToShow = Array.from(
      { length: Math.min(5, totalPages) },
      (_, i) => i + 1
    );
  } else if (currentPage > totalPages - 4) {
    // 最後の4ページの場合、最後から5ページを表示
    pagesToShow = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
  } else {
    // それ以外の場合、現在のページを中心に3ページを表示
    pagesToShow = Array.from({ length: 3 }, (_, i) => currentPage - 1 + i);
  }

  // ページ番号に基づいてリンクのパスを生成する関数
  const generatePagePath = (page) => {
    // 1ページ目の場合は basePathのページリンクを返す
    if (page === 1) return `${basePath}/`;
    // それ以外の場合は通常通りのページリンクを生成
    return `${basePath}/page/${page}`;
  };

  // console.log("totalCount => ", totalCount);
  // console.log("currentPage => ", currentPage);
  // console.log("pages => ", pages);

  return (
    <>
      <ul className={styles.list}>
        {/* 先頭のページと省略記号の表示 */}
        {currentPage > 4 && (
          <>
            <li className={styles.item}>
              <Link href={generatePagePath(1)} className={styles.link}>
                1
              </Link>
            </li>
            <li className={styles.item}>
              <span className={styles.link}>...</span>
            </li>
          </>
        )}

        {/* 中央のページ番号 */}
        {pagesToShow.map((page) => (
          <li className={styles.item} key={page}>
            {currentPage !== page ? (
              <Link href={generatePagePath(page)} className={styles.link}>
                {page}
              </Link>
            ) : (
              <span className={`${styles.link} ${styles.current}`}>{page}</span>
            )}
          </li>
        ))}

        {/* 末尾の省略記号と最終ページ */}
        {currentPage < totalPages - 3 && totalPages > 5 && (
          <>
            <li className={styles.item}>
              <span className={styles.link}>...</span>
            </li>
            <li className={styles.item}>
              <Link href={generatePagePath(totalPages)} className={styles.link}>
                {totalPages}
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};
