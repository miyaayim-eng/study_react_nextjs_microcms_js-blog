import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { Cards } from "@/features/components/blog/article/list/Cards";
import { Pagination } from "@/features/components/blog/article/list/Pagination";
// import { generateBlogInfo } from "@/libs/generateBlogInfo";
// const blogInfo = await generateBlogInfo();
// const articleInfo = blogInfo.articleInfo;

export default async function Page() {
  // ブログ一覧を取得
  const queries = { limit: LIMIT };
  const articlesListResponse = await getArticlesList(queries).catch(() =>
    notFound()
  );
  const { contents: articles, totalCount: totalCount } = articlesListResponse;

  return (
    <>
      <div>
        {!articles || articles.length === 0 ? (
          <div className={styles.notItem}>
            <p className={styles.notItem__text}>
              現在、記事は公開されておりません。
            </p>
          </div>
        ) : (
          <>
            <Cards articles={articles} />
            <Pagination totalCount={totalCount} />
          </>
        )}
      </div>
    </>
  );
}
