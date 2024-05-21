import { notFound } from "next/navigation";
import {
  SITE_NAME,
  FILTER_SEPARATOR,
  NEXT_PUBLIC_URL,
  OGP,
  TWITTER,
  FILTER_DESCRIPTION,
} from "@/constants/metadata";
import styles from "./page.module.scss";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { Cards } from "@/features/components/blog/article/list/Cards";
import { Pagination } from "@/features/components/blog/article/list/Pagination";

export async function generateMetadata({ params, searchParams }) {
  const searchKeyword = searchParams.q;
  const title = `${searchKeyword}${FILTER_SEPARATOR}検索`;
  const description = `${searchKeyword}${FILTER_DESCRIPTION}`;
  const pageUrl = `search/page/${params.current}/?q=${searchParams.q}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${pageUrl}`,
    },
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_URL}${pageUrl}`,
      siteName: SITE_NAME,
      locale: OGP.LOCALE,
      type: "article",
      images: OGP.IMAGE,
    },
    twitter: {
      card: TWITTER.CARD,
      images: TWITTER.IMAGE,
    },
  };
}

export default async function Page({ params, searchParams }) {
  // URLから現在の検索キーワードを取得
  const searchKeyword = searchParams.q;
  // URLから現在のページ番号を数値として取得
  const currentPage = parseInt(params.current, 10);

  // ブログ一覧を取得
  const queries = {
    offset: (currentPage - 1) * LIMIT,
    limit: LIMIT,
    q: searchKeyword,
  };
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
          <Cards articles={articles} />
          <Pagination
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
