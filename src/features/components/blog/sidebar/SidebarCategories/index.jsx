import Link from "next/link";
import styles from "./index.module.scss";
import { getCategories } from "@/libs/microcms";
import { getCategoryReferencedCount } from "@/libs/getCategoryReferencedCount";

export const SidebarCategories = async ({ currentCategory, currentPage }) => {
  // カテゴリごとの登録件数を取得
  const categoryCountData = await getCategoryReferencedCount();
  // console.log("categoryCountData => ", categoryCountData);

  // ブログカテゴリーを取得
  const categoriesResponse = await getCategories();
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

  // "current" というクラス名を条件に応じて付与するための関数
  const getCurrentClass = (categoryId) => {
    // paramsがundefinedの場合や、params.categoryIdがundefinedの場合に備える
    const isCurrent = categoryId === currentCategory;
    return isCurrent ? `${styles.link} ${styles.current}` : styles.link;
  };

  return (
    <div className={styles.category}>
      <ul className={styles.list}>
        {categories.map((category) => {
          if (categoryCountData[category.id]) {
            return currentCategory !== category.id || currentPage ? (
              <li className={styles.item} key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className={getCurrentClass(category.id)}
                >
                  <span className={styles.text}>
                    <span className={styles.name}>{category.name}</span>
                    <span className={styles.count}>
                      {categoryCountData[category.id] || 0}
                    </span>
                  </span>
                  <svg className={styles.icon}>
                    <use href="#svg-chevron-right" />
                  </svg>
                </Link>
              </li>
            ) : (
              <li className={styles.item} key={category.id}>
                <span className={`${styles.link} ${styles.current}`}>
                  <span className={styles.text}>
                    <span className={styles.name}>{category.name}</span>
                    <span className={styles.count}>
                      {categoryCountData[category.id] || 0}
                    </span>
                  </span>
                  <svg className={styles.icon}>
                    <use href="#svg-chevron-right" />
                  </svg>
                </span>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
