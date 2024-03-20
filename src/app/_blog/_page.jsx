// "use client";
// import axios from "axios";

// import { useState } from "react";
// import { useState, useEffect } from "react";

import Link from "next/link";
import { getList } from "../../libs/microcms";
import { getCategories } from "../../libs/microcms";
import styles from "./page.module.scss";
import utility from "src/scss/utility/utility.module.scss";

import { Category } from "@/features/components/blog/Category/Category";

export default async function Home() {
  // const [category, setCategory] = useState([]);

  // ブログ一覧を取得
  const { contents: posts } = await getList();
  // console.log("posts => ", posts);

  // ブログカテゴリーを取得
  const { contents: categories } = await getCategories();
  // console.log("categories => ", categories);

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  // 記事がない場合
  if (!posts || posts.length === 0) {
    return <h1>No posts</h1>;
  }

  return (
    <div className={`${styles.container} ${utility.inner}`}>
      <Category
        categories={categories}
        // currentCategory={currentCategory}
        // setCurrentCategory={setCurrentCategory}
      />
      <div>
        <h1>生成time: {time}</h1>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
            <p>{post.id}</p>
          </li>
        ))}
      </div>
    </div>
  );
}
