import styles from "./index.module.scss";
import { getCategories } from "@/libs/microcms";
import { Category } from "@/features/components/blog/Category";
import { getCategoryReferencedCount } from "@/libs/getCategoryReferencedCount";

export const SidebarCategories = async ({ currentCategory, currentPage }) => {
  // カテゴリごとの登録件数を取得
  const categoryCountData = await getCategoryReferencedCount();
  // console.log("categoryCountData => ", categoryCountData);

  // ブログカテゴリーを取得
  const queries = { fields: "id,name" };
  const categoriesResponse = await getCategories(queries);
  // console.log("categoriesResponse => ", categoriesResponse);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const {
    data: categories,
    error: categoriesError,
    totalCount: totalCount,
  } = await categoriesResponse.json();
  // console.log("categories => ", categories);
  // console.log("totalCount => ", totalCount);

  if (categoriesError != null) {
    return <div>カテゴリ取得エラーが発生しました。</div>;
  }

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
