import parse from "html-react-parser";
import styles from "./index.module.scss";

export const Body = ({ article }) => {
  return (
    <div className={styles.contents}>
      <div className={`${styles.richText} target-toc`}>
        {parse(article.body)}
      </div>
    </div>
  );
};
