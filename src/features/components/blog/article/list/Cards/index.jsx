import styles from "./index.module.scss";
import { Card } from "@/features/components/blog/article/list/Card";

export const Cards = ({ articles }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {articles.map((article) => (
          <Card article={article} key={article.id} />
        ))}
      </ul>
    </div>
  );
};
