import styles from "./page.module.scss";
import Link from "next/link";
import { notFound } from "next/navigation";
// リッチディタで作成したコンテンツ部分をHTMLパースするためのモジュール
import utility from "@sass//utility/utility.module.scss";
import { getArticlesList, getArticlesDetail } from "@/libs/microcms";
import { ArticleInfo } from "@/features/components/blog/article/detail/ArticleInfo";
import { ArticleContents } from "@/features/components/blog/article/detail/ArticleContents";
import { ArticleToc } from "@/features/components/blog/article/detail/ArticleToc";

// この関数は、静的サイト生成（SSG）のために、ビルド時に事前生成すべき
// ページのパスを動的に生成します。具体的には、microCMSから取得した
// ブログの一覧データに基づき、各ブログポストに対応するパスを含む
// パラメータオブジェクトの配列を作成し、それを返します。
// これにより、Next.jsはビルド時に各ブログポストの詳細ページを
// 事前に生成できるようになります。
// 自分のまとめ：これがなくても表示は問題なくできるが、build時に事前に生成しておくことで、データ取得をせずとも事前に用意したデータを表示することでページ表示速度が向上する。ということだと思う。
export async function generateStaticParams() {
  // ブログ一覧をAPI経由で取得します
  const articlesListResponse = await getArticlesList();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: articles, error: articlesListError } =
    await articlesListResponse.json();

  // 取得したブログ一覧から、各ブログのIDを使用して
  // ページ生成に必要なパラメータオブジェクトの配列を作成します
  const paths = articles.map((article) => {
    // 各ブログポストのIDを用いて、必要なパラメータオブジェクトを作成
    // 'articleId'キーに対応する値として'article.id'を設定
    // これにより、各生成されるページに対して、どのブログポストのデータを
    // 取得して表示するかを指定するための情報を提供します
    return {
      slug: article.id,
    };
  });
  // await console.log("paths => ", paths);

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function Page({ params }) {
  // URLパラメータのIDを参照して、ブログの詳細を取得
  // await console.log("params => ", params);
  const { slug } = params;
  const articlesDetailResponse = await getArticlesDetail(slug);
  const { data: article, error: articlesDetailError } =
    await articlesDetailResponse.json();

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  // 記事がない場合は'404 Not Found'を表示
  if (!article) {
    notFound();
  }

  return (
    <>
      <div className={`${styles.inner} ${utility.inner}`}>
        <article className={`${styles.container} ${utility.inner}`}>
          <div className={styles.areaNavigation}>
            <Link href="/">一覧にもどる</Link>
          </div>
          <div className={styles.areaTitle}>
            <ArticleInfo article={article} />
          </div>
          <div className={styles.areaToc}>
            <div className={styles.tocBlock}>
              <ArticleToc article={article} />
            </div>
          </div>
          <div className={styles.areaContents}>
            <ArticleContents article={article} />
          </div>
        </article>
      </div>
    </>
  );
}
