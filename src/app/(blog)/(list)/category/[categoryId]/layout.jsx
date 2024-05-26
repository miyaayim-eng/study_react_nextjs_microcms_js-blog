import styles from "./layout.module.scss";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

// カテゴリーページの静的パスを作成
export async function generateStaticParams() {
  const categories = blogInfo.categories;
  const paths = categories.map((category) => {
    return {
      categoryId: category.id,
    };
  });

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function CategoryLayout({ children, params }) {
  const currentCategory = params.categoryId;
  const currentCategoryName = blogInfo.categories.find(
    (category) => category.id === currentCategory
  )?.name;

  return (
    <>
      <div className={styles.intro}>
        <p className={styles.intro__group}>カテゴリー</p>
        <h1 className={styles.category}>
          <svg className={styles.category__icon}>
            <use href="#svg-category" />
          </svg>
          <span className={styles.category__name}>{currentCategoryName}</span>
        </h1>
      </div>
      <div className={styles.container}>
        {children}
        <div className={styles.sidebar}>
          <SidebarList blogInfo={blogInfo} currentCategory={currentCategory} />
        </div>
      </div>
    </>
  );
}
