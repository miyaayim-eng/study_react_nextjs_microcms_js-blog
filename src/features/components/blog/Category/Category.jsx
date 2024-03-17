// "use client";

import styles from "./Category.module.scss";

export const Category = ({ categories }) => {
  return (
    <div className={styles.category}>
      <ul className={styles.list}>
        {categories.map((category) => {
          return (
            <li className={`${styles.item} `} key={category.id}>
              {category.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// export const Category = ({
//   categories,
//   currentCategory,
//   setCurrentCategory,
// }) => {
//   return (
//     <div className={styles.category}>
//       <ul className={styles.list}>
//         {categories.map((category) => {
//           return (
//             <li
//               className={`${styles.item} ${
//                 currentCategory === category.name ? "active" : ""
//               }`}
//               key={category.name}
//               onClick={() => setCurrentCategory(category.name)}
//             >
//               {category.name}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
