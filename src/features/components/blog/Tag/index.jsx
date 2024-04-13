import Link from "next/link";
import styles from "./index.module.scss";

export const Tag = async ({ tag, tagCountData }) => {
  return (
    <Link href={`/tag/${tag.id}`} className={styles.link}>
      <span className={styles.hashtag}>#</span>
      {/* tagCountDataが存在する、またはその値が0の場合、tagCountDataを表示 */}
      {tagCountData !== undefined && tagCountData !== null ? (
        <>
          <span className={styles.name}>{tag.name}</span>
          <span className={styles.count}>{tagCountData}</span>
        </>
      ) : (
        <span className={styles.name}>{tag.name}</span>
      )}
    </Link>
  );
};
