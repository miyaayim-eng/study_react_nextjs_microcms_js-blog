import styles from "./layout.module.scss";
import { getCategories } from "@/libs/microcms";
import { Categories } from "@/features/components/blog/Categories";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";

// カテゴリページの静的パスを作成
export async function generateStaticParams() {
  // ブログカテゴリー一覧をAPI経由で取得します
  const categoriesResponse = await getCategories();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories, error: categoriesError } =
    await categoriesResponse.json();

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
  // console.log('params => ', params);
  // console.log('params.categoryId => ', params.categoryId);
  // console.log('currentCategory => ', currentCategory);

  return (
    <>
      <Categories currentCategory={currentCategory} />
      <div className={styles.container}>
        {children}
        <SidebarList />
      </div>
    </>
  );
}
