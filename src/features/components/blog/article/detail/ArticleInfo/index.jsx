import Image from "next/image";
import styles from "./index.module.scss";
import { Tag } from "@/features/components/blog/Tag";
import { Category } from "@/features/components/blog/Category";
import { DateCreated } from "@/features/components/blog/date/DateCreated";
import { DateRevised } from "@/features/components/blog/date/DateRevised";

export const ArticleInfo = ({ article }) => {
  // console.log("article => ", article);

  return (
    <>
      {article.thumbnail ? (
        <p className={styles.thumbnail}>
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            height={article.thumbnail.height}
            width={article.thumbnail.width}
            className={styles.thumbnail__image}
          />
        </p>
      ) : null}
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.category}>
        <Category category={article.category} />
      </p>

      {article.tags.length > 0 && (
        <ul className={styles.tags}>
          {article.tags.map((tag) => (
            <li className={styles.tag} key={tag.id}>
              <Tag tag={tag} />
            </li>
          ))}
        </ul>
      )}
      <div className={styles.dates}>
        <DateCreated article={article} />
        {article.createdAt !== article.updatedAt && (
          <DateRevised article={article} />
        )}
      </div>
    </>
  );
};
