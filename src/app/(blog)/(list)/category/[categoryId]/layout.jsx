import styles from "./layout.module.scss";
import { getCategoriesList, getCategoriesDetail } from "@/libs/microcms";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { getCategoryReferencedCount } from "@/libs/getFilterReferencedCount";

// カテゴリーページの静的パスを作成
export async function generateStaticParams() {
  // ブログカテゴリー一覧をAPI経由で取得します
  const queries = { fields: "id" };
  const categoriesListResponse = await getCategoriesList(queries);
  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories } = await categoriesListResponse.json();
  // カテゴリーごとの登録件数を取得
  const categoryCountData = await getCategoryReferencedCount();

  const paths = categories
    .map((category) => {
      if (categoryCountData[category.id]) {
        return {
          categoryId: category.id,
        };
      }
      return null; // 明示的に null を返す
    })
    .filter(Boolean); // null または undefined の要素を除去

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function CategoryLayout({ children, params }) {
  const currentCategory = params.categoryId;

  // 現在のカテゴリー名を取得
  const categoriesDetailResponse = await getCategoriesDetail(
    params.categoryId,
    { fields: "name" }
  );
  const { data } = await categoriesDetailResponse.json();
  const currentCategoryName = data.name;

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.intro__group}>カテゴリー</p>
        <h1 className={styles.category}>
          <svg className={styles.category__icon}>
            <use href="#svg-category" />
          </svg>
          <span className={styles.category__name}>{currentCategoryName}</span>
        </h1>
      </div>
      <div className={styles.container}>
        {children}
        <div className={styles.sidebar}>
          <SidebarList currentCategory={currentCategory} />
        </div>
      </div>
    </>
  );
}
