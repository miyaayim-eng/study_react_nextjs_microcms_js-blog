import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

export default async function Page() {
  // ブログ一覧を取得
  const queries = { limit: LIMIT };
  const articlesListResponse = await getArticlesList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const {
    data: articles,
    error: articlesListError,
    totalCount: totalCount,
  } = await articlesListResponse.json();

  // この時点の'data'の中身は、
  // [{id:(...), title:(...), content:(...)},{id:(...), title:(...), content:(...)}]
  // といった感じ。
  // console.log("articles => ", articles);
  // console.log("totalCount => ", totalCount);

  // if (articlesListError != null) {
  //   return <div>記事リスト取得エラーが発生しました。</div>;
  // }

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
            <ArticlesPagination totalCount={totalCount} />
          </>
        )}
      </div>
    </>
  );
}
