import styles from "./layout.module.scss";
import { getCategories } from "@/libs/microcms";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";

// カテゴリページの静的パスを作成
export async function generateStaticParams() {
  // ブログカテゴリー一覧をAPI経由で取得します
  const queries = { fields: "id" };
  const categoriesResponse = await getCategories(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();
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
  // URLから現在のページIDを取得
  const currentCategory = params.categoryId;

  // ブログカテゴリーを取得
  const filters = `id[equals]${currentCategory}`;
  const queries = { fields: "name", filters: filters };
  const categoriesResponse = await getCategories(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();
  // console.log("categories => ", categories);

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.intro__group}>カテゴリー</p>
        <h1 className={styles.category}>
          <svg className={styles.category__icon}>
            <use href="#svg-category" />
          </svg>
          <span className={styles.category__name}>{categories[0].name}</span>
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
