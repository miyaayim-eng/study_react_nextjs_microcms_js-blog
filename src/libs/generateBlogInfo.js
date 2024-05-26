import { notFound } from "next/navigation";
import { generateArticlesInfo } from "@/libs/generateArticlesInfo";
import { getCategoriesList, getTagsList } from "@/libs/microcms";

export const generateBlogInfo = async () => {
  const queries = { limit: 100 };
  const articleInfo = await generateArticlesInfo();

  // カテゴリー
  const categoriesListResponse = await getCategoriesList(queries).catch(() =>
    notFound()
  );
  const { contents: categoriesContents } = categoriesListResponse;
  // カテゴリーのオブジェクト内にtotalCountを追加
  const updatedCategoriesContents = categoriesContents.map((category) => ({
    ...category,
    totalCount: articleInfo.categoriesTotalCounts[category.id] || 0,
  }));
  // 記事登録数ゼロのカテゴリーは除去
  const categories = updatedCategoriesContents.filter(
    (category) => category.totalCount > 0
  );

  // タグ
  const tagsListResponse = await getTagsList(queries).catch(() => notFound());
  const { contents: tagsContents } = tagsListResponse;
  // カテゴリーのオブジェクト内にtotalCountを追加
  const updatedTagsContents = tagsContents.map((tag) => ({
    ...tag,
    totalCount: articleInfo.tagsTotalCounts[tag.id] || 0,
  }));
  // 記事登録数ゼロのカテゴリーは除去
  const tags = updatedTagsContents.filter((tag) => tag.totalCount > 0);

  return {
    articleInfo,
    categories,
    tags,
  };
};
