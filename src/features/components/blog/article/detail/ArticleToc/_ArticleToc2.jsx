import styles from "./ArticleToc.module.scss";
import { renderToc } from "@/libs/render-toc";

export const ArticleToc = ({ article }) => {
  const toc = renderToc(article.content);
  // console.log(toc); // 検証用にconsole.logでデバッグ

  return (
    <div>
      <p>目次</p>
      <ul>
        {toc.map((data) => (
          <li className={styles[data.name]} key={data.id}>
            <a href={`#${data.id}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
