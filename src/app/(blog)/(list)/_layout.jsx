// 共通のCSS
import styles from "./page.module.scss";
import utility from "@sass/utility/utility.module.scss";

// 共通のパーツ
import { Categories } from "@/features/components/Categories";
import { SidebarList } from "@/features/components/sidebar/SidebarList";

// 共通の見た目
export default function RootLayout({ children }) {
  return (
    <>
      <div className={`${styles.inner} ${utility.inner}`}>
        <Categories />
        <div className={styles.container}>
          {children}
          <SidebarList />
        </div>
      </div>
    </>
  );
}
