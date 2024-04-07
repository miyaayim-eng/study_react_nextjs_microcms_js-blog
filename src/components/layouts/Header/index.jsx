import Link from "next/link";
import styles from "./index.module.scss";
import utility from "@sass/utility/utility.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <p>ヘッダー</p>
      <p>
        <Link href="/" className={utility.txtLink}>
          トップに戻る
        </Link>
      </p>
    </header>
  );
};
