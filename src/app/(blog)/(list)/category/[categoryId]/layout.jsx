import { getCategories } from "@/libs/microcms";

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

export default async function CategoryLayout({ children }) {
  return <>{children}</>;
}
