import styles from "./layout.module.scss";
import { getCategories, getCategoriesDetail } from "@/libs/microcms";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";

export async function generateMetadata({ params }) {
  const categoriesDetailResponse = await getCategoriesDetail(
    params.categoryId,
    { fields: "name" }
  );
  const { data } = await categoriesDetailResponse.json();
  const currentCategoryName = data.name;

  return {
    title: `${currentCategoryName} - カテゴリー`,
    description: `${currentCategoryName}に関する記事一覧です。`,
  };
}

// カテゴリーページの静的パスを作成
export async function generateStaticParams() {
  // ブログカテゴリー一覧をAPI経由で取得します
  const queries = { fields: "id" };
  const categoriesResponse = await getCategories(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories } = await categoriesResponse.json();
  // console.log("categories => ", categories);

  const paths = categories.map((category) => {
    return {
      categoryId: category.id,
    };
  });
  // await console.log("paths => ", paths);

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
