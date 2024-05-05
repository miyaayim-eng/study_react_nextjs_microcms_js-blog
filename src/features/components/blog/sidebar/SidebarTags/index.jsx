import styles from "./index.module.scss";
import { getTags } from "@/libs/microcms";
import { Tag } from "@/features/components/blog/Tag";
import { getTagReferencedCount } from "@/libs/getTagReferencedCount";

export const SidebarTags = async ({ currentTag, currentPage }) => {
  // カテゴリごとの登録件数を取得
  const tagCountData = await getTagReferencedCount();
  // console.log("tagCountData => ", tagCountData);

  // ブログタグを取得
  const queries = { fields: "id,name" };
  const tagsResponse = await getTags(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: tags, error: tagsError } = await tagsResponse.json();
  // console.log("tags => ", tags);

  if (tagsError != null) {
    return <div>タグ取得エラーが発生しました。</div>;
  }

  // 生成するカテゴリーがカレントであるかを判別するための関数
  const isCurrentTag = (tagId) => {
    // paramsがundefinedの場合や、params.tagIdがundefinedの場合に備える
    const isCurrent = tagId === currentTag;
    return isCurrent;
  };

  return (
    <div className={styles.tags}>
      <ul className={styles.list}>
        {tags.map((tag) => {
          if (tagCountData[tag.id]) {
            return (
              <li key={tag.id}>
                <Tag
                  tag={tag}
                  tagCountData={tagCountData[tag.id] || 0}
                  isCurrent={isCurrentTag(tag.id)}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
