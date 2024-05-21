import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import {
  SITE_NAME,
  FILTER_SEPARATOR,
  NEXT_PUBLIC_URL,
  OGP,
  TWITTER,
  FILTER_DESCRIPTION,
} from "@/constants/metadata";
import { getArticlesList, getTagsDetail } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { Cards } from "@/features/components/blog/article/list/Cards";
import { Pagination } from "@/features/components/blog/article/list/Pagination";

export async function generateMetadata({ params }) {
  const tagsDetailResponse = await getTagsDetail(params.tagId, {
    fields: "name",
  });
  const { data } = await tagsDetailResponse.json();
  const currentTagName = data.name;
  const title = `${currentTagName}${FILTER_SEPARATOR}タグ`;
  const description = `${currentTagName}${FILTER_DESCRIPTION}`;
  const pageUrl = `tag/${params.tagId}/`;

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

  // ブログ一覧を取得
  const filters = `tags[contains]${params.tagId}`;
  const queries = { limit: LIMIT, filters: filters };
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
        <Pagination totalCount={totalCount} basePath={`/tag/${currentTag}`} />
      </div>
    </>
  );
}
