import styles from "./index.module.scss";
import { getTagsList } from "@/libs/microcms";
import { Tag } from "@/features/components/blog/Tag";
import { getTagReferencedCount } from "@/libs/getFilterReferencedCount";

export const SidebarTags = async ({ currentTag, currentPage }) => {
  // カテゴリーごとの登録件数を取得
  const tagCountData = await getTagReferencedCount();

  // ブログタグを取得
  const queries = { fields: "id,name" };
  const tagsListResponse = await getTagsList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: tags } = await tagsListResponse.json();

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
