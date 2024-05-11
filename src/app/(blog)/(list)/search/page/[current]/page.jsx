import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

export default async function Page({ params, searchParams }) {
  // URLから現在の検索キーワードを取得
  const searchKeyword = searchParams.q;
  // URLから現在のページ番号を数値として取得
  const currentPage = parseInt(params.current, 10);
  // console.log("params => ", params);
  // console.log("searchKeyword => ", searchKeyword);
  // console.log("currentPage => ", currentPage);

  // ブログ一覧を取得
  const queries = {
    offset: (currentPage - 1) * LIMIT,
    limit: LIMIT,
    q: searchKeyword,
  };
  const articlesListResponse = await getArticlesList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: articles, totalCount: totalCount } =
    await articlesListResponse.json();

  if (articles.length === 0) {
    notFound();
  }

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
          <ArticlesList articles={articles} />
          <ArticlesPagination
            totalCount={totalCount}
            basePath="/search"
            currentPage={currentPage}
            searchKeyword={searchKeyword}
          />
        </div>
        <SidebarList />
      </div>
    </>
  );
}
