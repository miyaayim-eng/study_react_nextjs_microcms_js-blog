import Link from "next/link";
import styles from "./index.module.scss";
import { LIMIT } from "@/constants";

export const ArticlesPagination = ({
  totalCount,
  currentPage = 1,
  basePath = "",
  searchKeyword,
}) => {
  // 全ページ数を計算
  const totalPages = Math.ceil(totalCount / LIMIT);

  // 表示するページ番号のリストを計算
  let pagesToShow;
  // console.log("totalCount => ", totalCount);
  // console.log("totalPages => ", totalPages);

  if (totalPages <= 7) {
    // すべて表示
    pagesToShow = Array.from(
      { length: Math.min(totalCount, totalPages) },
      (_, i) => i + 1
    );
  } else if (currentPage <= 4) {
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

  // 検索キーワードがある場合は、URL末尾に検索用のパラメータを挿入する関数
  const generateSearchParam = () => {
    return searchKeyword ? `?q=${searchKeyword}` : "";
  };

  // ページ番号に基づいて '/page/' 部分を挿入するか判断する関数
  const generatePagePathSegment = (page) => {
    // 1ページ目の場合は '/' を返し、それ以外は '/page/{page}' を返す
    return page === 1 ? "/" : `/page/${page}`;
  };

  // ページ番号に基づいてリンクのパスを生成する関数
  const generatePagePath = (page) => {
    // basePathに対して、必要に応じて'/page/{page}'部分と検索パラメータを追加
    return `${basePath}${generatePagePathSegment(
      page
    )}${generateSearchParam()}`;
  };

  // console.log("totalCount => ", totalCount);
  // console.log("currentPage => ", currentPage);
  // console.log("basePath => ", basePath);
  // console.log("searchKeyword => ", searchKeyword);

  return (
    <>
      <ul className={styles.list}>
        {/* 先頭のページと省略記号の表示 */}
        {currentPage > 4 && totalPages > 7 && (
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
        {currentPage < totalPages - 3 && totalPages > 7 && (
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
