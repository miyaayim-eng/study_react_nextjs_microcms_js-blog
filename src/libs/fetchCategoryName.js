import { getCategories } from "@/libs/microcms";

// カテゴリーページにて現在のカテゴリ名を取得
export async function fetchCategoryName(categoryId) {
  const filters = `id[equals]${categoryId}`;
  const queries = { fields: "name", filters: filters };
  const categoriesResponse = await getCategories(queries);
  const { data: categories } = await categoriesResponse.json();
  return categories[0].name;
}
