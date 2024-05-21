import styles from "./layout.module.scss";
import { getTagsList, getTagsDetail } from "@/libs/microcms";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { getTagReferencedCount } from "@/libs/getFilterReferencedCount";

// カテゴリーページの静的パスを作成
export async function generateStaticParams() {
  // ブログタグ一覧をAPI経由で取得します
  const queries = { fields: "id" };
  const tagsListResponse = await getTagsList(queries);
  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: tags } = await tagsListResponse.json();
  // カテゴリーごとの登録件数を取得
  const tagCountData = await getTagReferencedCount();

  const paths = tags
    .map((tag) => {
      if (tagCountData[tag.id]) {
        return {
          tagId: tag.id,
        };
      }
      return null; // 明示的に null を返す
    })
    .filter(Boolean); // null または undefined の要素を除去

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function tagLayout({ children, params }) {
  const currentTag = params.tagId;

  // 現在のタグ名を取得
  const tagsDetailResponse = await getTagsDetail(params.tagId, {
    fields: "name",
  });
  const { data } = await tagsDetailResponse.json();
  const currentTagName = data.name;

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.intro__group}>カテゴリー</p>
        <h1 className={styles.tag}>
          <span className={styles.tag__hashtag}>#</span>
          <span className={styles.tag__name}>{currentTagName}</span>
        </h1>
      </div>
      <div className={styles.container}>
        {children}
        <div className={styles.sidebar}>
          <SidebarList currentTag={currentTag} />
        </div>
      </div>
    </>
  );
}
