import { Suspense } from "react";
import styles from "./index.module.scss";
import SearchField from "@/features/components/blog/SearchField";
import { SidebarProfile } from "@/features/components/blog/sidebar/SidebarProfile";
import { SidebarCategories } from "@/features/components/blog/sidebar/SidebarCategories";
import { SidebarTags } from "@/features/components/blog/sidebar/SidebarTags";

export const SidebarList = ({ currentCategory, currentTag, currentPage }) => {
  return (
    <div className={styles.sidebar}>
      <div>
        <Suspense>
          <SearchField />
        </Suspense>
      </div>
      <div className={styles.sidebar__container}>
        <div className={`${styles.sidebar__item} ${styles.sidebar__profile}`}>
          <p className={styles.sidebar__title}>
            <svg
              className={`${styles.sidebar__title__icon} ${styles.sidebar__title__icon__user}`}
            >
              <use href="#svg-user" />
            </svg>
            <span className={styles.sidebar__title__txt}>Profile</span>
          </p>
          <SidebarProfile />
        </div>
      </div>

      <div className={styles.sidebar__stickyBox}>
        <div
          className={`${styles.sidebar__container} ${styles.sidebar__sticky}`}
        >
          <div
            className={`${styles.sidebar__item} ${styles.sidebar__categories}`}
          >
            <p className={styles.sidebar__title}>
              <svg
                className={`${styles.sidebar__title__icon} ${styles.sidebar__title__icon__category}`}
              >
                <use href="#svg-category" />
              </svg>
              <span className={styles.sidebar__title__txt}>Categories</span>
            </p>
            <SidebarCategories
              currentCategory={currentCategory}
              currentPage={currentPage}
            />
          </div>
          <div className={`${styles.sidebar__item} ${styles.sidebar__tags}`}>
            <p className={styles.sidebar__title}>
              <svg
                className={`${styles.sidebar__title__icon} ${styles.sidebar__title__icon__tag}`}
              >
                <use href="#svg-tag" />
              </svg>
              <span className={styles.sidebar__title__text}>Tags</span>
            </p>
            <SidebarTags currentTag={currentTag} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};
