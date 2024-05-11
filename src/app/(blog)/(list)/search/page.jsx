import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

export async function generateMetadata({ searchParams }) {
  const searchKeyword = searchParams.q;
  return {
    title: `${searchKeyword} [検索]`,
    description: `${searchKeyword}に関する記事検索結果一覧です。`,
  };
}

export default async function Page({ searchParams }) {
  // URLから現在の検索キーワードを取得
  const searchKeyword = searchParams.q;
  // console.log("searchKeyword => ", searchKeyword);
  // ブログ一覧を取得
  const queries = { limit: LIMIT, q: searchKeyword };
  const articlesListResponse = await getArticlesList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const {
    data: articles,
    error: articlesListError,
    totalCount: totalCount,
  } = await articlesListResponse.json();

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.intro__group}>記事検索</p>
        <h1 className={styles.intro__text}>
          <span className={styles.intro__text__search}>
            「{searchKeyword}」
          </span>
          <span>の検索結果</span>
        </h1>
      </div>
      <div className={styles.container}>
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
                basePath="/search"
                searchKeyword={searchKeyword}
              />
            </>
          )}
        </div>
        <div className={styles.sidebar}>
          <SidebarList />
        </div>
      </div>
    </>
  );
}
