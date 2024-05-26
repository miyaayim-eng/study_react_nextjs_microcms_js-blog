import Link from "next/link";
import styles from "./index.module.scss";

export const Tag = async ({ tag, isCurrent }) => {
  // コンテンツを生成するための関数
  const tagContent = (
    <>
      <span className={styles.hashtag}>#</span>
      <span className={styles.name}>{tag.name}</span>
      {/* totalCountが存在し、nullでもない場合のみ、countを表示 */}
      {tag.totalCount !== undefined && tag.totalCount !== null && (
        <span className={styles.count}>{tag.totalCount}</span>
      )}
    </>
  );

  // isCurrentがtrueの場合はspanタグ、それ以外はLinkタグを使用
  if (isCurrent) {
    return (
      <span className={`${styles.link} ${styles.current}`}>{tagContent}</span>
    );
  } else {
    return (
      <Link href={`/tag/${tag.id}`} className={styles.link}>
        {tagContent}
      </Link>
    );
  }
};
