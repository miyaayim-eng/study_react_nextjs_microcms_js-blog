import Link from "next/link";
import styles from "./index.module.scss";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { Info } from "@/features/components/blog/article/detail/Info";
import { Body } from "@/features/components/blog/article/detail/Body";
import { TocBox } from "@/features/components/blog/article/detail/TocBox";
import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

export const Article = ({ article }) => {
  return (
    <article>
      <div className={styles.info}>
        <Info article={article} />
      </div>
      <div className={styles.container}>
        {article.toc ? (
          <div className={styles.toc}>
            <div className={styles.tocBlock}>
              <TocBox article={article} />
            </div>
          </div>
        ) : (
          <div className={styles.sidebar}>
            <SidebarList blogInfo={blogInfo} />
          </div>
        )}
        <div className={styles.bodyWrap}>
          <div className={styles.body}>
            <Body article={article} />
          </div>
          <p className={styles.back}>
            <Link href={`/`} className={styles.back__link}>
              <span className={styles.back__iconWrap}>
                <svg className={styles.back__icon}>
                  <use href="#svg-chevron-left" />
                </svg>
              </span>
              <span className={styles.back__text}>一覧にもどる</span>
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
};
