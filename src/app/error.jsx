"use client";
import styles from "./error.module.scss";
import utility from "@sass/utility/utility.module.scss";
import Link from "next/link";

export const metadata = {
  title: "エラーが発生しました",
  description: "エラーが発生したため、ページを表示できません。",
};

export default function Error() {
  return (
    <>
      <div className={`${styles.inner} ${utility.inner}`}>
        <h1 className={styles.title}>
          <span className={styles.title__jp}>エラーが発生しました。</span>
        </h1>
        <p className={styles.body}>
          アクセスしようとしたページは表示できませんでした。
          <br />
          サーバーに問題が生じたか、ページが存在しない可能性があります。
          <br />
          <br />
          しばらくしてから再度お試しいただくか、下のリンクからトップページに戻って他のコンテンツをお楽しみください。
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
