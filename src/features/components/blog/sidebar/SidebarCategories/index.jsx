import styles from "./index.module.scss";
import { getCategoriesList } from "@/libs/microcms";
import { Category } from "@/features/components/blog/Category";
import { getCategoryReferencedCount } from "@/libs/getFilterReferencedCount";

export const SidebarCategories = async ({ currentCategory, currentPage }) => {
  // カテゴリーごとの登録件数を取得
  const categoryCountData = await getCategoryReferencedCount();

  // ブログカテゴリーを取得
  const queries = { fields: "id,name" };
  const categoriesListResponse = await getCategoriesList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, totalCount: totalCount } =
    await categoriesListResponse.json();

  // 生成するカテゴリーがカレントであるかを判別するための関数
  const isCurrentCategory = (categoryId) => {
    // paramsがundefinedの場合や、params.categoryIdがundefinedの場合に備える
    const isCurrent = categoryId === currentCategory;
    return isCurrent;
  };

  return (
    <div className={styles.category}>
      <ul className={styles.list}>
        {categories.map((category) => {
          if (categoryCountData[category.id]) {
            return (
              <li key={category.id}>
                <Category
                  category={category}
                  categoryCountData={categoryCountData[category.id] || 0}
                  isCurrent={isCurrentCategory(category.id)}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
