// "use client";
// import axios from "axios";

// import { useState } from "react";
// import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
// リッチディタで作成したコンテンツ部分をHTMLパースするためのモジュール
import parse from "html-react-parser";
import styles from "./page.module.scss";
import utility from "src/scss/utility/utility.module.scss";
import { getDetail, getList } from "../../../libs/microcms";

// この関数は、静的サイト生成（SSG）のために、ビルド時に事前生成すべき
// ページのパスを動的に生成します。具体的には、microCMSから取得した
// ブログの一覧データに基づき、各ブログポストに対応するパスを含む
// パラメータオブジェクトの配列を作成し、それを返します。
// これにより、Next.jsはビルド時に各ブログポストの詳細ページを
// 事前に生成できるようになります。
export async function generateStaticParams() {
  // ブログ一覧をAPI経由で取得します
  const { contents } = await getList();

  // 取得したブログ一覧から、各ブログのIDを使用して
  // ページ生成に必要なパラメータオブジェクトの配列を作成します
  const paths = contents.map((post) => {
    // 各ブログポストのIDを用いて、必要なパラメータオブジェクトを作成
    // 'postId'キーに対応する値としてpost.idを設定
    // これにより、各生成されるページに対して、どのブログポストのデータを
    // 取得して表示するかを指定するための情報を提供します
    return {
      postId: post.id,
    };
  });
  // await console.log("paths => ", paths);

  // 作成したパスの配列を返します。
  return [...paths];
}

export default async function Home({ params }) {
  // URLパラメータのIDを参照して、ブログの詳細を取得
  // await console.log("params => ", params);
  const { postId } = params;
  const post = await getDetail(postId);

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  // 記事がない場合は'404 Not Found'を表示
  if (!post) {
    notFound();
  }

  return (
    <div className={`${styles.container} ${utility.inner}`}>
      <Link href="/blog">一覧にもどる</Link>
      <h2>生成time:{time}</h2>
      <h1>{post.title}</h1>
      <div>{parse(post.content)}</div>
    </div>
  );
}
