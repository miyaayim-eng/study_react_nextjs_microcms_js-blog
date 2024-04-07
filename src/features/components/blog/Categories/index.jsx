import styles from "./index.module.scss";
import { getCategories } from "@/libs/microcms";
import { Category } from "@/features/components/blog/Category";

export const Categories = async ({ currentCategory }) => {
  // ブログカテゴリーを取得
  const categoriesResponse = await getCategories();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();
  // console.log("categories => ", categories);

  if (categoriesError != null) {
    return <div>カテゴリ取得エラーが発生しました。</div>;
  }

  return (
    <div className={styles.categories}>
      <ul className={styles.list}>
        {categories.map((category) => {
          return (
            <li className={styles.item} key={category.id}>
              <Category
                categoryId={category.id}
                categoryName={category.name}
                currentCategory={currentCategory}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
