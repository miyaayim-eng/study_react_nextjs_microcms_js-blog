import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";
import { Tag } from "@/features/components/blog/Tag";
import { DateCreated } from "@/features/components/blog/date/DateCreated";
import { DateRevised } from "@/features/components/blog/date/DateRevised";
import noImage from "@/public/assets/images/no-image.png";
import { getCategoriesDetail, getTagsDetail } from "@/libs/microcms";

export const ArticlesItem = async ({ article }) => {
  // サムネイル画像設定
  // 表示サムネイル優先順位 => 記事 > タグ（先頭タグ） > カテゴリー > No image
  let thumbnail = null;
  let thumbnailSrc = null;
  let thumbnailAlt = null;
  let thumbnailHeight = null;
  let thumbnailWidth = null;
  if (article.thumbnail) {
    // 記事に登録したサムネイル画像
    thumbnail = article.thumbnail;
    thumbnailAlt = article.title;
  } else if (article.tags.length > 0) {
    // タグに登録したサムネイル画像
    const tagsDetailResponse = await getTagsDetail(article.tags[0].id, {
      fields: "thumbnail",
    });
    const { data } = await tagsDetailResponse.json();
    thumbnail = data.thumbnail;
  }
  if (!thumbnail) {
    // カテゴリーに登録したサムネイル画像
    const categoriesDetailResponse = await getCategoriesDetail(
      article.category.id,
      { fields: "thumbnail" }
    );
    const { data } = await categoriesDetailResponse.json();
    thumbnail = data.thumbnail;
    thumbnailAlt = article.category.name;
  }
  if (thumbnail) {
    thumbnailSrc = thumbnail.url;
    thumbnailHeight = thumbnail.height;
    thumbnailWidth = thumbnail.width;
  } else {
    // No Imageのサムネイル画像
    thumbnailSrc = noImage;
    thumbnailAlt = "No Image";
  }

  return (
    <li className={styles.item}>
      <div className={styles.container}>
        <p className={styles.thumbnail}>
          <Image
            src={thumbnailSrc}
            alt={thumbnailAlt}
            height={thumbnailHeight}
            width={thumbnailWidth}
            className={styles.thumbnail__image}
            priority
          />
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
