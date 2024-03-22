import Image from "next/image";
import Link from "next/link";
// import localImage from "src/public/assets/images/sample_photograph.jpg";
// import PublishDate from '@/_components/PublishDate';
// import PublishDate from "../../PublishDate/PublishDate";
import styles from "./ArticlesItem.module.scss";

export const ArticlesItem = ({ article }) => {
  // console.log(article.thumbnail);
  // console.log(article.tags);
  return (
    <li>
      <Link href={`/blog/articles/${article.id}`} className={styles.link}>
        <div className={styles.container}>
          <p className={styles.thumbnail}>
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              height={article.thumbnail.height}
              width={article.thumbnail.width}
            />
          </p>
          <div className={styles.info}>
            <div className={styles.category}>
              <p className={styles.category__text}>{article.category.name}</p>
            </div>

            <div className={styles.title}>
              <h2 className={styles.title__text}>{article.title}</h2>
            </div>
            <div className={styles.keyword}>
              <ul className={styles.keyword__list}>
                {article.tags.map((tag) => (
                  <li className={styles.keyword} key={tag.id}>
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.date}>
              {/* <time className={styles.date__text} datetime={article.createdAt}>
                {article.createdAt}作成
              </time> */}
              {/* <PublishDate date={article} /> */}
              {/* <time className={styles.date__text} datetime={article.updatedAt}>
                {article.updatedAt}更新
              </time> */}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
