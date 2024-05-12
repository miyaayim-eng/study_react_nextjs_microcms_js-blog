import Link from "next/link";
import styles from "./index.module.scss";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { ArticleInfo } from "@/features/components/blog/article/detail/ArticleInfo";
import { ArticleContents } from "@/features/components/blog/article/detail/ArticleContents";
import { ArticleToc } from "@/features/components/blog/article/detail/ArticleToc";

export const Article = ({ article }) => {
  return (
    <article>
      <div className={styles.info}>
        <ArticleInfo article={article} />
      </div>
      <div className={styles.container}>
        {article.toc ? (
          <div className={styles.toc}>
            <div className={styles.tocBlock}>
              <ArticleToc article={article} />
            </div>
          </div>
        ) : (
          <div className={styles.sidebar}>
            <SidebarList />
          </div>
        )}
        <div className={styles.contentsWrap}>
          <div className={styles.contents}>
            <ArticleContents article={article} />
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
