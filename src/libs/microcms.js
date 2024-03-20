import { createClient } from "microcms-js-sdk";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

// '.env.local'ファイルにmicroCMSの'サービスドメイン'、'APIキー'が無い場合はエラーメッセージを表示
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  // throw new Error("MICROCMS_SERVICE_DOMAIN is required");
  throw new Error("MICROCMS_SERVICE_DOMAIN が設定されていません。");
}
if (!process.env.MICROCMS_API_KEY) {
  // throw new Error("MICROCMS_API_KEY is required");
  throw new Error("API_KEY が設定されていません。");
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ記事一覧を取得
export const getList = async (queries) => {
  try {
    const response = await client.getList({
      endpoint: "posts",
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
    // console.log("listData => ", response);

    // データの取得が目視しやすいよう明示的に遅延効果を追加
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      data: response.contents ?? null,
      error: null,
    });
  } catch {
    console.error("getListのエラーが発生しました", error);
    return NextResponse.json({
      data: null,
      error: error.message,
    });
  }
};

// ブログ記事詳細を取得
export const getDetail = async (contentId, queries) => {
  try {
    // 'getListDetail'ではなく'get'でやってる人がいた？調べること
    // 多分だけど、名前は自由に命名できるってだけかも。命名することができる理由は調べてない
    const response = await client.getListDetail({
      endpoint: "posts",
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

    // データの取得が目視しやすいよう明示的に遅延効果を追加
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      data: response ?? null,
      error: null,
    });
  } catch (error) {
    console.error("getDetailのエラーが発生しました", error);
    redirect("/404");
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

    // データの取得が目視しやすいよう明示的に遅延効果を追加
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      data: response.contents ?? null,
      error: null,
    });
  } catch {
    console.error("getCategoriesのエラーが発生しました", error);
    return NextResponse.json({
      data: null,
      error: error.message,
    });
  }
};
