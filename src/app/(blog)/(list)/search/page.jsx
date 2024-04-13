import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { Categories } from "@/features/components/blog/Categories";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

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

  // 記事がない場合
  if (!articles || articles.length === 0) {
    return <h1>記事が0件でした。</h1>;
  }

  return (
    <>
      <p>「{searchKeyword}」の検索結果</p>
      <Categories />
      <div className={styles.container}>
        <div>
          <ArticlesList articles={articles} />
          <ArticlesPagination
            totalCount={totalCount}
            basePath="/search"
            searchKeyword={searchKeyword}
          />
        </div>
        <SidebarList />
      </div>
    </>
  );
}
