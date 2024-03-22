import Link from "next/link";
import { getArticlesList } from "../../../../libs/microcms";
import { getCategories } from "../../../../libs/microcms";
import styles from "./page.module.scss";
import utility from "src/scss/utility/utility.module.scss";

import { Categories } from "@/_features/components/blog/Categories/Categories";
import { ArticlesList } from "@/_features/components/blog/Article/ArticlesList/ArticlesList";

export async function generateStaticParams() {
  const categoriesResponse = await getCategories();

  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();

  const paths = categories.map((category) => {
    return {
      categoryId: category.id,
    };
  });
  // await console.log("paths => ", paths);

  return [...paths];
}

export default async function Page({ params }) {
  // console.log(params);
  // ブログ一覧を取得
  const filters = `category[equals]${params.categoryId}`;
  const articlesListResponse = await getArticlesList({ filters });

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: articles, error: articlesListError } =
    await articlesListResponse.json();

  // ブログカテゴリーを取得
  const categoriesResponse = await getCategories();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();
  // console.log("categories => ", categories);

  // ページの生成された時間を取得
  // const time = new Date().toLocaleString();

  if (articlesListError != null) {
    return <div>記事リスト取得エラーが発生しました。</div>;
  }
  if (categoriesError != null) {
    return <div>カテゴリ取得エラーが発生しました。</div>;
  }

  // 記事がない場合
  if (!articles || articles.length === 0) {
    return <h1>記事が0件でした。</h1>;
  }

  return (
    <div className={`${styles.container} ${utility.inner}`}>
      <Categories categories={categories} params={params} />
      <ArticlesList articles={articles} />
    </div>
  );
}
