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
import { LIMIT } from "@/constants";
import { getArticlesList, getTagsDetail } from "@/libs/microcms";
import { Cards } from "@/features/components/blog/article/list/Cards";
import { Pagination } from "@/features/components/blog/article/list/Pagination";
import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

// ページネーションページの静的パスを作成
export async function generateStaticParams({ params }) {
  // ブログ一覧を取得
  const filters = `tags[contains]${params.tagId}`;
  const queries = { limit: LIMIT, filters: filters };
  const articlesListResponse = await getArticlesList(queries);
  const { totalCount: totalCount } = articlesListResponse;

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

export async function generateMetadata({ params }) {
  const currentTag = params.tagId;
  const currentTagName = blogInfo.tags.find(
    (tag) => tag.id === currentTag
  )?.name;
  const title = `${currentTagName}${FILTER_SEPARATOR}タグ`;
  const description = `${currentTagName}${FILTER_DESCRIPTION}`;
  const pageUrl = `tag/${params.tagId}/page/${params.current}/`;

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
      type: "website",
      images: OGP.IMAGE,
    },
    twitter: {
      card: TWITTER.CARD,
      images: TWITTER.IMAGE,
    },
  };
}

export default async function Page({ params }) {
  // URLから現在のページIDを取得
  const currentTag = params.tagId;
  // URLから現在のページ番号を数値として取得
  const currentPage = parseInt(params.current, 10);

  // ブログ一覧を取得
  const filters = `tags[contains]${params.tagId}`;
  const queries = {
    offset: (currentPage - 1) * LIMIT,
    limit: LIMIT,
    filters: filters,
  };
  const articlesListResponse = await getArticlesList(queries).catch(() =>
    notFound()
  );

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { contents: articles, totalCount: totalCount } = articlesListResponse;

  if (articles.length === 0) {
    notFound();
  }

  return (
    <>
      <div>
        <Cards articles={articles} />
        <Pagination
          totalCount={totalCount}
          basePath={`/tag/${currentTag}`}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
