import styles from "./index.module.scss";
import { ArticlesItem } from "@/features/components/blog/article/list/ArticlesItem";

export const ArticlesList = ({ articles }) => {
  // console.log(articles);
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {articles.map((article) => (
          <ArticlesItem article={article} key={article.id} />
        ))}
      </ul>
    </div>
  );
};
