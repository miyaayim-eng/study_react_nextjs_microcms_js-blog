import Link from "next/link";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <p>header</p>
      <p>
        <Link href="/">（新）トップに戻る</Link>
      </p>
      <p>
        <a href="/">（旧）トップに戻る</a>
      </p>
    </header>
  );
};
