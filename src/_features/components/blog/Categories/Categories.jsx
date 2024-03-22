import Link from "next/link";
import styles from "./Categories.module.scss";

export const Categories = ({ categories, params }) => {
  return (
    <div className={styles.category}>
      <ul className={styles.list}>
        {categories.map((category) => {
          console.log("category.id => ", category.id);
          console.log("params => ", params);
          return (
            <li
              className={`${styles.item} ${
                category.id === params ? "active" : ""
              } `}
              key={category.id}
            >
              <Link
                href={`/blog/category/${category.id}`}
                className={styles.link}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
