import Link from "next/link";
import styles from "./index.module.scss";
import { getCategories } from "@/libs/microcms";

export const SidebarCategories = async ({ params }) => {
  // ブログカテゴリーを取得
  const categoriesResponse = await getCategories();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();
  // console.log("categories => ", categories);

  if (categoriesError != null) {
    return <div>カテゴリ取得エラーが発生しました。</div>;
  }

  // "active" というクラス名を条件に応じて付与するための関数
  const getActiveClass = (id) => {
    // paramsがundefinedの場合や、params.categoryIdがundefinedの場合に備える
    const isActive = id === params?.categoryId;
    return isActive ? `active ${styles.item}` : styles.item;
  };

  return (
    <div className={styles.category}>
      <ul className={styles.list}>
        {categories.map((category) => {
          return (
            <li className={getActiveClass(category.id)} key={category.id}>
              <Link href={`/category/${category.id}`} className={styles.link}>
                <span className={styles.text}>{category.name}</span>
                <svg className={styles.icon}>
                  <use href="#svg-chevron-right" />
                </svg>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
