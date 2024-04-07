import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";
import { Tag } from "@/features/components/blog/Tag";
import { DateCreated } from "@/features/components/blog/date/DateCreated";
import { DateRevised } from "@/features/components/blog/date/DateRevised";

export const ArticlesItem = ({ article }) => {
  // console.log(article.thumbnail);
  // console.log(article.tags);
  return (
    <li className={styles.item}>
      {/* <Link href={`/articles/${article.id}`} className={styles.link}> */}
      <div className={styles.container}>
        <p className={styles.thumbnail}>
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            height={article.thumbnail.height}
            width={article.thumbnail.width}
            className={styles.thumbnail__image}
          />
        </p>
        <div className={styles.info}>
          <h2 className={styles.title}>
            <Link href={`/articles/${article.id}`} className={styles.link}>
              <span className={styles.title__text}>{article.title}</span>
            </Link>
          </h2>

          <p className={styles.category}>
            <svg className={styles.category__icon}>
              <use href="#svg-category" />
            </svg>
            <span className={styles.category__text}>
              {article.category.name}
            </span>
          </p>
          <ul className={styles.tags}>
            {article.tags.map((tag) => (
              <li className={styles.tag} key={tag.id}>
                <Tag tag={tag} />
              </li>
            ))}
          </ul>
          <div className={styles.dates}>
            <DateCreated article={article} />
            <DateRevised article={article} />
          </div>
        </div>
      </div>
      {/* </Link> */}
    </li>
  );
};
