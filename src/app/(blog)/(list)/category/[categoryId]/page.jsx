import styles from "./page.module.scss";
import { LIMIT } from "@/constants";
import { Categories } from "@/features/components/blog/Categories";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { getArticlesList } from "@/libs/microcms";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

export default async function Page({ params }) {
  // URLから現在のページIDを取得
  const currentCategory = params.categoryId;
  // console.log('params => ', params);
  // console.log('params.categoryId => ', params.categoryId);
  // console.log('currentCategory => ', currentCategory);

  // ブログ一覧を取得
  const filters = `category[equals]${params.categoryId}`;
  const queries = { limit: LIMIT, filters: filters };
  const articlesListResponse = await getArticlesList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const {
    data: articles,
    error: articlesListError,
    totalCount: totalCount,
  } = await articlesListResponse.json();

  // ページの生成された時間を取得
  // const time = new Date().toLocaleString();

  if (articlesListError != null) {
    return <div>記事リスト取得エラーが発生しました。</div>;
  }

  return (
    <>
      <Categories currentCategory={currentCategory} />
      <div className={styles.container}>
        <div>
          {
            // 条件 ? trueの場合に実行する式 : falseの場合に実行する式
            !articles || articles.length === 0 ? (
              <h1>記事が0件でした。</h1>
            ) : (
              <ArticlesList articles={articles} />
            )
          }
          <ArticlesPagination
            totalCount={totalCount}
            basePath={`/category/${currentCategory}`}
          />
        </div>
        <SidebarList currentCategory={currentCategory} />
      </div>
    </>
  );
}
