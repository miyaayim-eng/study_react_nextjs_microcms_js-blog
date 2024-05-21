import Link from "next/link";
import styles from "./index.module.scss";
import { getCategoriesList } from "@/libs/microcms";
import { MenuButton } from "@/components/layouts/Menu/MenuButton";
import { MenuContents } from "@/components/layouts/Menu/MenuContents";

export const Header = async () => {
  // ブログカテゴリーを取得
  const queries = { fields: "id,name" };
  const categoriesListResponse = await getCategoriesList(queries);

  // 取得しているデータがわかりやすいように、変数名を変更しています。
  const { data: categories } = await categoriesListResponse.json();

  return (
    <>
      <header className={styles.header}>
        <p className={styles.logo}>
          <Link href="/" className={styles.logo__link}>
            <span className={styles.logo__text}>みやがめボックス</span>
          </Link>
        </p>
        <div className={styles.menu}>
          <nav className={styles.menu__nav}>
            <ul className={styles.menu__list}>
              {categories.map((category) => {
                return (
                  <li className={styles.menu__item} key={category.id}>
                    <Link
                      href={`/category/${category.id}`}
                      className={styles.menu__link}
                    >
                      <svg className={styles.menu__icon}>
                        <use href="#svg-category" />
                      </svg>
                      <span className={styles.menu__name}>{category.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <MenuButton />
      </header>
      <MenuContents />
    </>
  );
};
