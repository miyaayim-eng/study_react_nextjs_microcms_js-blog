import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { Categories } from "@/features/components/blog/Categories";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
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
          <ArticlesPagination totalCount={totalCount} />
        </div>
        <SidebarList />
      </div>
    </>
  );
}
