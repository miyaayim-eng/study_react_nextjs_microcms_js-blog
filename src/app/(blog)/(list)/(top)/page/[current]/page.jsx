import { notFound } from "next/navigation";
import {
  SITE_NAME,
  NEXT_PUBLIC_URL,
  OGP,
  TWITTER,
  HOME_DESCRIPTION,
} from "@/constants/metadata";
import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { Cards } from "@/features/components/blog/article/list/Cards";
import { Pagination } from "@/features/components/blog/article/list/Pagination";

export async function generateMetadata({ params }) {
  const title = SITE_NAME;
  const description = HOME_DESCRIPTION;
  const pageUrl = `page/${params.current}/`;

  return {
    absolute: title,
    description,
    alternates: {
      canonical: `${pageUrl}`,
    },
    openGraph: {
      absolute: title,
      description,
      url: `${NEXT_PUBLIC_URL}${pageUrl}`,
      siteName: SITE_NAME,
      locale: OGP.LOCALE,
      type: "website",
      images: OGP.IMAGE,
    },
    twitter: {
      card: TWITTER.CARD,
      images: TWITTER.IMAGE,
    },
  };
}

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

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function Page({ params }) {
  // URLから現在のページ番号を数値として取得
  const currentPage = parseInt(params.current, 10);

  // ブログ一覧を取得
  const queries = { offset: (currentPage - 1) * LIMIT, limit: LIMIT };
  const articlesListResponse = await getArticlesList(queries).catch(() =>
    notFound()
  );

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: articles, totalCount: totalCount } =
    await articlesListResponse.json();

  if (articles.length === 0) {
    notFound();
  }

  return (
    <>
      <div>
        <Cards articles={articles} />
        <Pagination totalCount={totalCount} currentPage={currentPage} />
      </div>
    </>
  );
}
