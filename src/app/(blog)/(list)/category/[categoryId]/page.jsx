import { notFound } from "next/navigation";
import {
  SITE_NAME,
  FILTER_SEPARATOR,
  BASE_URL,
  OGP,
  TWITTER,
  FILTER_DESCRIPTION,
} from "@/constants/metadata";
import styles from "./page.module.scss";
import { getArticlesList, getCategoriesDetail } from "@/libs/microcms";
import { LIMIT } from "@/constants";
import { Cards } from "@/features/components/blog/article/list/Cards";
import { Pagination } from "@/features/components/blog/article/list/Pagination";
import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

export async function generateMetadata({ params }) {
  const currentCategory = params.categoryId;
  const currentCategoryName = blogInfo.categories.find(
    (category) => category.id === currentCategory
  )?.name;
  const title = `${currentCategoryName}${FILTER_SEPARATOR}カテゴリー`;
  const description = `${currentCategoryName}${FILTER_DESCRIPTION}`;
  const pageUrl = `category/${params.categoryId}/`;

  return {
    title: title,
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
  // URLからカテゴリIDを取得
  const currentCategory = params.categoryId;
  // ブログ一覧を取得
  const filters = `category[equals]${currentCategory}`;
  const queries = { limit: LIMIT, filters: filters };
  const articlesListResponse = await getArticlesList(queries).catch(() =>
    notFound()
  );
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
          basePath={`/category/${currentCategory}`}
        />
      </div>
    </>
  );
}
