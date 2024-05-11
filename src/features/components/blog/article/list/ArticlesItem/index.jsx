import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";
import { Tag } from "@/features/components/blog/Tag";
import { DateCreated } from "@/features/components/blog/date/DateCreated";
import { DateRevised } from "@/features/components/blog/date/DateRevised";
import noImage from "@/public/assets/images/no-image.png";
import { fetchCategoryThumbnail } from "@/libs/fetchCategoryThumbnail";

export const ArticlesItem = async ({ article }) => {
  let categoryThumbnail = null; // 初期値としてnullを設定
  // 記事のサムネイルが存在しない場合のみカテゴリーサムネイルを取得（APIリクエスト回数を減らす目的）
  if (!article.thumbnail) {
    categoryThumbnail = await fetchCategoryThumbnail(article.category.id);
  }

  return (
    <li className={styles.item}>
      <div className={styles.container}>
        <p className={styles.thumbnail}>
          {article.thumbnail ? (
            // 記事のサムネイル画像を表示
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              height={article.thumbnail.height}
              width={article.thumbnail.width}
              className={styles.thumbnail__image}
              priority
            />
          ) : categoryThumbnail ? (
            // カテゴリーのサムネイル画像を表示
            <Image
              src={categoryThumbnail.url}
              alt={categoryThumbnail.title}
              height={categoryThumbnail.height}
              width={categoryThumbnail.width}
              className={styles.thumbnail__image}
            />
          ) : (
            <Image
              src={noImage}
              alt="No Image"
              className={styles.thumbnail__image}
            />
          )}
        </p>
        <div className={styles.info}>
          <h2 className={styles.title}>
            <Link href={`/articles/${article.id}`} className={styles.link}>
              <span className={styles.title__text}>{article.title}</span>
            </Link>
          </h2>

          <p className={styles.category}>
            <Link
              href={`/category/${article.category.id}`}
              className={styles.category__link}
            >
              <svg className={styles.category__icon}>
                <use href="#svg-category" />
              </svg>
              <span className={styles.category__name}>
                {article.category.name}
              </span>
            </Link>
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
        </div>
      </div>
    </li>
  );
};
