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

// 記事一覧を取得
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

// 記事詳細を取得
export const getArticlesDetail = async (contentId, queries) => {
  try {
    const response = await client.getListDetail({
      endpoint: "articles",
      // 'contentId'はIDを受け取り、取得する詳細記事を判別するためのもの
      contentId,
      queries,
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

// カテゴリー一覧を取得
export const getCategoriesList = async (queries) => {
  try {
    const response = await client.getList({
      endpoint: "categories",
      queries,
    });

    return NextResponse.json({
      data: response.contents ?? null,
      error: null,
      totalCount: response.totalCount,
    });
  } catch (error) {
    console.error("getCategoriesListでエラーが発生しました", error);
    notFound();
  }
};

// カテゴリー詳細を取得
export const getCategoriesDetail = async (contentId, queries) => {
  try {
    const response = await client.getListDetail({
      endpoint: "categories",
      contentId,
      queries,
    });

    return NextResponse.json({
      data: response ?? null,
      error: null,
    });
  } catch (error) {
    console.error("getCategoriesDetailでエラーが発生しました", error);
    notFound();
  }
};

// ブログタグ一覧を取得
export const getTagsList = async (queries) => {
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
    console.error("getTagsListでエラーが発生しました => ", error);
    notFound();
  }
};

// タグ詳細を取得
export const getTagsDetail = async (contentId, queries) => {
  try {
    const response = await client.getListDetail({
      endpoint: "tags",
      contentId,
      queries,
    });

    return NextResponse.json({
      data: response ?? null,
      error: null,
    });
  } catch (error) {
    console.error("getTagsDetailでエラーが発生しました", error);
    notFound();
  }
};
