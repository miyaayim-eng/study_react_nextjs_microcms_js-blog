// 共通のCSS
import styles from "./layout.module.scss";
import utility from "@sass/utility/utility.module.scss";

// 共通の見た目
export default function ListLayout({ children }) {
  return (
    <>
      <div className={`${styles.inner} ${utility.inner}`}>{children}</div>
    </>
  );
}
