import styles from "./index.module.scss";
import { Category } from "@/features/components/blog/Category";

export const SidebarCategories = async ({ blogInfo, currentCategory }) => {
  const categories = blogInfo.categories;

  // 生成するカテゴリーがカレントであるかを判別するための関数
  const isCurrentCategory = (categoryId) => {
    const isCurrent = categoryId === currentCategory;
    return isCurrent;
  };

  return (
    <div className={styles.category}>
      <ul className={styles.list}>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <Category
                category={category}
                isCurrent={isCurrentCategory(category.id)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
