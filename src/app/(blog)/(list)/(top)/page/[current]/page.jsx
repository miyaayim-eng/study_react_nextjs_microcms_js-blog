import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { ArticlesList } from "@/features/components/blog/article/list/ArticlesList";
import { ArticlesPagination } from "@/features/components/blog/article/list/ArticlesPagination";

// ページネーションページの静的パスを作成
export async function generateStaticParams() {
  // ブログ一覧を取得
  const queries = { limit: LIMIT };
  const articlesListResponse = await getArticlesList(queries);
  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { totalCount: totalCount } = await articlesListResponse.json();

  if (totalCount <= LIMIT) {
    return []; // ページが1ページ以下の場合はパスを生成しない
  }

  // ページ番号が2ページ目から開始するように配列を生成し、それをページパスに変換します
  const paths = Array.from({ length: Math.ceil(totalCount / LIMIT) })
    .map((_, i) => i + 1)
    .slice(1) // 最初のページ (i.e., 1) を除外
    .map((pageNumber) => ({
      current: pageNumber.toString(),
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

  return (
    <>
      <div>
        <ArticlesList articles={articles} />
        <ArticlesPagination totalCount={totalCount} currentPage={currentPage} />
      </div>
    </>
  );
}
