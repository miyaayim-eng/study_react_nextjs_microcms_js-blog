import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import {
  SITE_NAME,
  FILTER_SEPARATOR,
  BASE_URL,
  OGP,
  TWITTER,
  FILTER_DESCRIPTION,
} from "@/constants/metadata";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { Cards } from "@/features/components/blog/article/list/Cards";
import { Pagination } from "@/features/components/blog/article/list/Pagination";
import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

export async function generateMetadata({ searchParams }) {
  const searchKeyword = searchParams.q;
  const title = `${searchKeyword}${FILTER_SEPARATOR}検索`;
  const description = `${searchKeyword}${FILTER_DESCRIPTION}`;
  const pageUrl = `search/?q=${searchParams.q}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${pageUrl}`,
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${pageUrl}`,
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

export default async function Page({ searchParams }) {
  // URLから現在の検索キーワードを取得
  const searchKeyword = searchParams.q;
  // ブログ一覧を取得
  const queries = { limit: LIMIT, q: searchKeyword };
  const articlesListResponse = await getArticlesList(queries).catch(() =>
    notFound()
  );

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { contents: articles, totalCount: totalCount } = articlesListResponse;

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
              <Cards articles={articles} />
              <Pagination
                totalCount={totalCount}
                basePath="/search"
                searchKeyword={searchKeyword}
              />
            </>
          )}
        </div>
        <div className={styles.sidebar}>
          <SidebarList blogInfo={blogInfo} />
        </div>
      </div>
    </>
  );
}
