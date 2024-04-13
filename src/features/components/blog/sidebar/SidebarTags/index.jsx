import styles from "./index.module.scss";
import { getTags } from "@/libs/microcms";
import { Tag } from "@/features/components/blog/Tag";
import { getTagReferencedCount } from "@/libs/getTagReferencedCount";

export const SidebarTags = async ({ params }) => {
  // カテゴリごとの登録件数を取得
  const tagCountData = await getTagReferencedCount();
  // console.log("tagCountData => ", tagCountData);

  // ブログタグを取得
  const tagsResponse = await getTags();

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: tags, error: tagsError } = await tagsResponse.json();
  // console.log("tags => ", tags);

  if (tagsError != null) {
    return <div>タグ取得エラーが発生しました。</div>;
  }

  // "active" というクラス名を条件に応じて付与するための関数
  const getActiveClass = (id) => {
    // paramsがundefinedの場合や、params.categoryIdがundefinedの場合に備える
    const isActive = id === params?.tagId;
    return isActive ? `active ${styles.item}` : styles.item;
  };

  return (
    <div className={styles.tags}>
      <ul className={styles.list}>
        {tags.map((tag) => {
          if (tagCountData[tag.id]) {
            return (
              <li className={getActiveClass(tag.id)} key={tag.id}>
                <Tag tag={tag} tagCountData={tagCountData[tag.id] || 0} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
