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
      <h2 className={styles.title}>{article.title}</h2>
      <div className={styles.dates}>
        <DateCreated article={article} />
        <DateRevised article={article} />
      </div>

      {/* <p className={styles.category}>
        <svg className={styles.category__icon}>
          <use href="#svg-category" />
        </svg>
        <span className={styles.category__text}>{article.category.name}</span>
      </p> */}
      <p className={styles.category}>
        <Category
          categoryId={article.category.id}
          categoryName={article.category.name}
        />
      </p>

      <ul className={styles.tags}>
        {article.tags.map((tag) => (
          <li className={styles.tag} key={tag.id}>
            <Tag tag={tag} />
          </li>
        ))}
      </ul>
      <p className={styles.thumbnail}>
        <Image
          src={article.thumbnail.url}
          alt={article.title}
          height={article.thumbnail.height}
          width={article.thumbnail.width}
          className={styles.thumbnail__image}
        />
      </p>
    </>
  );
};
