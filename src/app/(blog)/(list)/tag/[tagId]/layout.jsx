import styles from "./layout.module.scss";
import { getTags } from "@/libs/microcms";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";

// カテゴリページの静的パスを作成
export async function generateStaticParams() {
  // ブログタグ一覧をAPI経由で取得します
  const queries = { fields: "id" };
  const tagsResponse = await getTags(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: tags, error: tagsError } = await tagsResponse.json();
  // console.log("tags => ", tags);

  const paths = tags.map((tag) => {
    return {
      tagId: tag.id,
    };
  });
  // await console.log("paths => ", paths);

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function tagLayout({ children, params }) {
  // URLから現在のページIDを取得
  const currentTag = params.tagId;

  // ブログカテゴリーを取得
  const filters = `id[equals]${currentTag}`;
  const queries = { fields: "name", filters: filters };
  const tagsResponse = await getTags(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: tags, error: tagsError } = await tagsResponse.json();
  // console.log("tags => ", tags);
  // console.log("params => ", params);
  // console.log("currentTag => ", currentTag);

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.intro__group}>カテゴリー</p>
        <h1 className={styles.tag}>
          <span className={styles.tag__hashtag}>#</span>
          <span className={styles.tag__name}>{tags[0].name}</span>
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
