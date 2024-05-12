import { notFound } from "next/navigation";
import { getCategories } from "@/libs/microcms";

// カテゴリーに登録したサムネイル画像を取得
export async function fetchCategoryThumbnail(categoryId) {
  try {
    const filters = `id[equals]${categoryId}`;
    const queries = { fields: "thumbnail", filters: filters };
    const categoriesResponse = await getCategories(queries);
    const { data: categories } = await categoriesResponse.json();
    if (categories[0].thumbnail) {
      return categories[0].thumbnail;
    } else {
      return null;
    }
  } catch (error) {
    console.error("fetchCategoryThumbnailでエラーが発生しました => ", error);
    notFound();
  }
}
