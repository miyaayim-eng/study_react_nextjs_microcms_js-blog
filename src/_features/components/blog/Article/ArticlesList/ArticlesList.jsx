import styles from "./ArticlesList.module.scss";

import { ArticlesItem } from "../ArticlesItem/ArticlesItem";

export const ArticlesList = ({ articles }) => {
  // console.log(articles);
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <ArticlesItem article={article} key={article.id} />
      ))}
    </ul>
  );
};
