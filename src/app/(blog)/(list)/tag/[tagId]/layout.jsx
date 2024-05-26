import styles from "./layout.module.scss";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

// カテゴリーページの静的パスを作成
export async function generateStaticParams() {
  const tags = blogInfo.tags;

  const paths = tags.map((tag) => {
    return {
      tagId: tag.id,
    };
  });

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function tagLayout({ children, params }) {
  const currentTag = params.tagId;
  const currentTagName = blogInfo.tags.find(
    (tag) => tag.id === currentTag
  )?.name;

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.intro__group}>カテゴリー</p>
        <h1 className={styles.tag}>
          <span className={styles.tag__hashtag}>#</span>
          <span className={styles.tag__name}>{currentTagName}</span>
        </h1>
      </div>
      <div className={styles.container}>
        {children}
        <div className={styles.sidebar}>
          <SidebarList blogInfo={blogInfo} currentTag={currentTag} />
        </div>
      </div>
    </>
  );
}
