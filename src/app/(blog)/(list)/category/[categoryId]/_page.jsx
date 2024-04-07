import { LIMIT } from "@/constants";
import { getArticlesList } from "@/libs/microcms";
import { getCategories } from "@/libs/microcms";
import styles from "./page.module.scss";

import { Categories } from "@/features/components/Categories";
import { SidebarList } from "@/features/components/sidebar/SidebarList";
import { ArticlesList } from "@/features/components/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/article/list/ArticlesPagination";

// カテゴリページの静的パスを作成
export async function generateStaticParams({ params }) {
  // ブログカテゴリー一覧をAPI経由で取得します
  const categoriesResponse = await getCategories();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();

  const paths = categories.map((category) => {
    return {
      categoryId: category.id,
    };
  });
  // await console.log("paths => ", paths);

  // 作成したパスの配列を返します。
  return [...paths];
}

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
        <SidebarList />
      </div>
    </>
  );
}
