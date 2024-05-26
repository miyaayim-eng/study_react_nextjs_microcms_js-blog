import styles from "./index.module.scss";
import { Tag } from "@/features/components/blog/Tag";

export const SidebarTags = async ({ blogInfo, currentTag }) => {
  const tags = blogInfo.tags;

  // 生成するカテゴリーがカレントであるかを判別するための関数
  const isCurrentTag = (tagId) => {
    const isCurrent = tagId === currentTag;
    return isCurrent;
  };

  return (
    <div className={styles.tags}>
      <ul className={styles.list}>
        {tags.map((tag) => {
          return (
            <li key={tag.id}>
              <Tag tag={tag} isCurrent={isCurrentTag(tag.id)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
