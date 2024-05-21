import { generateArticlesInfo } from "@/libs/generateArticlesInfo";
import { getCategoriesList, getTagsList } from "@/libs/microcms";

export const generateBlogInfo = async () => {
  const articleInfo = await generateArticlesInfo();
  const categoriesListResponse = await getCategoriesList();
  const { data: categories } = await categoriesListResponse.json();
  const tagsListResponse = await getTagsList();
  const { data: tags } = await tagsListResponse.json();

  return {
    articleInfo,
    categories,
    tags,
  };
};
