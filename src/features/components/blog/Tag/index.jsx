import Link from "next/link";
import styles from "./index.module.scss";

export const Tag = async ({ tag }) => {
  return (
    <Link href={`/tag/${tag.id}`} className={styles.link}>
      <span className={styles.hashtag}>#</span>
      <span className={styles.text}>{tag.name}</span>
    </Link>
  );
};
