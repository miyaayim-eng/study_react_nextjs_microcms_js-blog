import styles from "./index.module.scss";
import { SidebarProfile } from "@/features/components/blog/sidebar/SidebarProfile";
import { SidebarCategories } from "@/features/components/blog/sidebar/SidebarCategories";
import { SidebarTags } from "@/features/components/blog/sidebar/SidebarTags";

export const SidebarList = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__item}>
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
      <div className={styles.sidebar__item}>
        <p className={styles.sidebar__title}>
          <svg
            className={`${styles.sidebar__title__icon} ${styles.sidebar__title__icon__category}`}
          >
            <use href="#svg-category" />
          </svg>
          <span className={styles.sidebar__title__txt}>Categories</span>
        </p>
        <SidebarCategories />
      </div>
      <div className={styles.sidebar__item}>
        <p className={styles.sidebar__title}>
          <svg
            className={`${styles.sidebar__title__icon} ${styles.sidebar__title__icon__tag}`}
          >
            <use href="#svg-tag" />
          </svg>
          <span className={styles.sidebar__title__text}>Tags</span>
        </p>
        <SidebarTags />
      </div>
    </div>
  );
};