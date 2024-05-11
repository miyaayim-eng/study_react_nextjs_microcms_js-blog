import { createClient } from "microcms-js-sdk";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";

// '.env.local'ファイルにmicroCMSの'サービスドメイン'、'APIキー'が無い場合はエラーメッセージを表示
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN が設定されていません。");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("API_KEY が設定されていません。");
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ記事一覧を取得
export const getArticlesList = async (queries) => {
  try {
    const response = await client.getList({
      endpoint: "articles",
      // 'queries'は絞り込みの（例：'limit'等）パラメータを受け取るためのもの
      queries,

      // revalidateでオプションを指定することで動的（Dynamic Rendering）なレンダリングとなる。
      // 'revalidate = 60'とすれば60秒間はキャッシュを利用するISR
      // 'revalidate = 0'とすれば常にレンダリングを行うSSR
      // customRequestInit: {
      //   next: {
      //     revalidate: 0, // 0秒でページを再読み込み
      //   },
      // },
    });

    // この時点の'response'の中身は、
    // contents: [{id:(...), title:(...), content:(...)},{id:(...), title:(...), content:(...)}]
    // といった感じ。
    // console.log("articlesListData => ", response);

    return NextResponse.json({
      data: response.contents ?? null,
      error: null,
      totalCount: response.totalCount,
    });
  } catch (error) {
    console.error("getArticlesListでエラーが発生しました => ", error);
    notFound();
  }
};

// ブログ記事詳細を取得
export const getArticlesDetail = async (contentId, queries) => {
  try {
    const response = await client.getListDetail({
      endpoint: "articles",
      // 'contentId'はIDを受け取り、取得する詳細記事を判別するためのもの
      contentId,
      queries,

      // revalidateでオプションを指定することで動的（Dynamic Rendering）なレンダリングとなる。
      // 'revalidate = 60'とすれば60秒間はキャッシュを利用するISR
      // 'revalidate = 0'とすれば常にレンダリングを行うSSR
      // customRequestInit: {
      //   next: {
      //     revalidate: 0,
      //   },
      // },
    });

    return NextResponse.json({
      data: response ?? null,
      error: null,
    });
  } catch (error) {
    console.error("getArticlesDetailでエラーが発生しました => ", error);
    notFound();
  }
};

// ブログカテゴリ一覧を取得
export const getCategories = async (queries) => {
  try {
    const response = await client.getList({
      endpoint: "categories",
      queries,

      // revalidateでオプションを指定することで動的（Dynamic Rendering）なレンダリングとなる。
      // 'revalidate = 60'とすれば60秒間はキャッシュを利用するISR
      // 'revalidate = 0'とすれば常にレンダリングを行うSSR
      // customRequestInit: {
      //   next: {
      //     revalidate: 0,
      //   },
      // },
    });

    // console.log("categoriesData => ", response);

    return NextResponse.json({
      data: response.contents ?? null,
      error: null,
      totalCount: response.totalCount,
    });
  } catch (error) {
    console.error("getCategoriesでエラーが発生しました", error);
    notFound();
  }
};

// ブログタグ一覧を取得
export const getTags = async (queries) => {
  try {
    const response = await client.getList({
      endpoint: "tags",
      queries,
    });

    return NextResponse.json({
      data: response.contents ?? null,
      error: null,
    });
  } catch (error) {
    console.error("getTagsでエラーが発生しました => ", error);
    notFound();
  }
};
