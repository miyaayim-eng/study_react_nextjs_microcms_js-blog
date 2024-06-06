import styles from "./layout.module.scss";
import utility from "@sass/utility/utility.module.scss";
import { SidebarList } from "@/features/components/blog/sidebar/SidebarList";
import { generateBlogInfo } from "@/libs/generateBlogInfo";
const blogInfo = await generateBlogInfo();

export default async function Layout({ children }) {
  return (
    <>
      <div className={styles.intro}>
        <h1 className={styles.intro__head}>サイト名</h1>
        <p className={styles.intro__desc}>
          サイトについてテキストテキストテキストテキストテキストテキストテキストテキストテキスト。
        </p>
      </div>
      <div className={styles.container}>
        {children}
        <div className={styles.sidebar}>
          <SidebarList blogInfo={blogInfo} />
        </div>
      </div>
    </>
  );
}
