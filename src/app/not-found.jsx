import Link from "next/link";
import styles from "./not-found.module.scss";
import utility from "@sass/utility/utility.module.scss";

export const metadata = {
  title: "ご指定のページが見つかりませんでした",
  description: "",
};

export default function NotFound() {
  return (
    <>
      <div className={`${styles.inner} ${utility.inner}`}>
        <h1 className={styles.title}>
          <span className={styles.title__en}>404 - Page Not Found</span>
          <span className={styles.title__jp}>
            ご指定のページが
            <span className={utility.inlineBlock}>見つかりませんでした。</span>
          </span>
        </h1>
        <p className={styles.body}>
          アクセスしようとしたページは削除、変更された可能性があります。
        </p>
        <p className={styles.back}>
          <Link href={`/`} className={styles.back__link}>
            <span className={styles.back__iconWrap}>
              <svg className={styles.back__icon}>
                <use href="#svg-chevron-left" />
              </svg>
            </span>
            <span className={styles.back__text}>トップにもどる</span>
          </Link>
        </p>
      </div>
    </>
  );
}
