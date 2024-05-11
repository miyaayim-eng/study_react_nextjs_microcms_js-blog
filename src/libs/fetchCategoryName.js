import { notFound } from "next/navigation";
import { getCategories } from "@/libs/microcms";

// カテゴリーページにて現在のカテゴリ名を取得
export async function fetchCategoryName(categoryId) {
  try {
    const filters = `id[equals]${categoryId}`;
    const queries = { fields: "name", filters: filters };
    const categoriesResponse = await getCategories(queries);
    const { data: categories } = await categoriesResponse.json();
    return categories[0].name;
  } catch (error) {
    console.error("fetchCategoryNameでエラーが発生しました => ", error);
    notFound();
  }
}
