import styles from "./layout.module.scss";
import { getTags, getTagsDetail } from "@/libs/microcms";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";

export async function generateMetadata({ params }) {
  // 現在のタグ名を取得
  const tagsDetailResponse = await getTagsDetail(params.tagId, {
    fields: "name",
  });
  const { data } = await tagsDetailResponse.json();
  const currentTagName = data.name;

  return {
    title: `${currentTagName} - タグ`,
    description: `${currentTagName}に関する記事一覧です。`,
  };
}

// カテゴリーページの静的パスを作成
export async function generateStaticParams() {
  // ブログタグ一覧をAPI経由で取得します
  const queries = { fields: "id" };
  const tagsResponse = await getTags(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: tags } = await tagsResponse.json();
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
