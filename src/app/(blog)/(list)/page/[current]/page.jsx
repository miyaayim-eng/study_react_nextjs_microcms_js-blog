import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { Categories } from "@/features/components/blog/Categories";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

// ページネーションページの静的パスを作成
export async function generateStaticParams() {
  // ブログ一覧を取得
  const queries = { limit: LIMIT };
  const articlesListResponse = await getArticlesList(queries);
  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { totalCount: totalCount } = await articlesListResponse.json();

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(2, Math.ceil(totalCount / LIMIT)).map((repo) => ({
    current: repo.toString(),
  }));

  // await console.log("paths => ", paths);

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function Page({ params }) {
  // URLから現在のページ番号を数値として取得
  const currentPage = parseInt(params.current, 10);

  // ブログ一覧を取得
  const queries = { offset: (currentPage - 1) * LIMIT, limit: LIMIT };
  const articlesListResponse = await getArticlesList(queries);

  // console.log('params => ', params);
  // console.log('params.categoryId => ', params.categoryId);
  // console.log('currentCategory => ', currentCategory);

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
      <Categories />
      <div className={styles.container}>
        <div>
          <ArticlesList articles={articles} />
          <ArticlesPagination
            totalCount={totalCount}
            currentPage={currentPage}
          />
        </div>
        <SidebarList />
      </div>
    </>
  );
}
