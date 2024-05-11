import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

export default async function Page({ params }) {
  // URLから現在のページIDを取得
  const currentTag = params.tagId;

  // ブログ一覧を取得
  const filters = `tags[contains]${params.tagId}`;
  const queries = { limit: LIMIT, filters: filters };
  const articlesListResponse = await getArticlesList(queries);
  // console.log("currentTag => ", currentTag);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: articles, totalCount: totalCount } =
    await articlesListResponse.json();

  return (
    <>
      <div>
        {!articles || articles.length === 0 ? (
          <div className={styles.notItem}>
            <p className={styles.notItem__text}>
              該当する記事は見つかりませんでした。
            </p>
          </div>
        ) : (
          <>
            <ArticlesList articles={articles} />
            <ArticlesPagination
              totalCount={totalCount}
              basePath={`/tag/${currentTag}`}
            />
          </>
        )}
      </div>
    </>
  );
}
