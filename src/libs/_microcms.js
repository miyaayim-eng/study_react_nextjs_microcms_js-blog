import { createClient } from "microcms-js-sdk";

// '.env.local'ファイルにmicroCMSの'サービスドメイン'、'APIキー'が無い場合はエラーメッセージを表示
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
  // throw new Error('MICROCMS_SERVICE_DOMAIN が設定されていません。');
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
  // throw new Error('API_KEY が設定されていません。');
}

// API取得用のクライアントを作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ブログ記事一覧を取得
export const getList = async (queries) => {
  const listData = await client.getList({
    endpoint: "posts",
    // 'queries'は絞り込みの（例：'limit'等）パラメータを受け取るためのもの
    queries,
  });
  // console.log("listData => ", listData);

  // データの取得が目視しやすいよう明示的に遅延効果を追加
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return listData;
};

// ブログ記事詳細を取得
export const getDetail = async (contentId, queries) => {
  const detailData = await client.getListDetail({
    endpoint: "blogs",
    // 'contentId'はIDを受け取り、取得する詳細記事を判別するためのもの
    contentId,
    queries,
  });

  // データの取得が目視しやすいよう明示的に遅延効果を追加
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return detailData;
};

// ブログカテゴリ一覧を取得
export const getCategories = async (queries) => {
  const categoriesData = await client.getList({
    endpoint: "categories",
    queries,
  });
  // console.log("categoriesData => ", categoriesData);

  // データの取得が目視しやすいよう明示的に遅延効果を追加
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return categoriesData;
};
