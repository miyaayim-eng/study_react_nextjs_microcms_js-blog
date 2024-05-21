import { generateArticlesInfo } from "@/libs/generateArticlesInfo";

export default async function sitemap() {
  const articleInfo = await generateArticlesInfo();
  const baseURL = process.env.NEXT_PUBLIC_URL || "";
  const _lastModified = new Date(); // 関数が実行された瞬間の現在の日付と時刻を取得

  // トップページなどの静的ページ
  const staticPaths = [
    {
      url: `${baseURL}`,
      lastModified: _lastModified,
    },
  ];

  // 投稿記事のような動的ページ
  const allArticlesPagePaths = articleInfo.allArticlesPagePaths;
  const allArticlesPageDynamicPaths = allArticlesPagePaths.map((page) => {
    return {
      url: `${baseURL}page/${page}/`,
      lastModified: _lastModified,
    };
  });

  const categories = articleInfo.categoriesInfo;
  const categoriesDynamicPaths = categories.map((category) => {
    return {
      url: `${baseURL}category/${category.id}/`,
      lastModified: new Date(category.createdAt), // カテゴリー作成日時
    };
  });

  const tags = articleInfo.tagsInfo;
  const tagsDynamicPaths = tags.map((tag) => {
    return {
      url: `${baseURL}tag/${tag.id}/`,
      lastModified: new Date(tag.createdAt), // タグ作成日時
    };
  });

  const categoriesPagePaths = articleInfo.categoriesPagePaths;
  const categoryPageDynamicPaths = [];
  for (const categoryId in categoriesPagePaths) {
    const pages = categoriesPagePaths[categoryId];
    pages.forEach((page) => {
      categoryPageDynamicPaths.push({
        url: `${baseURL}category/${categoryId}/page/${page}/`,
        lastModified: _lastModified,
      });
    });
  }

  const tagsPagePaths = articleInfo.tagsPagePaths;
  const tagPageDynamicPaths = [];
  for (const tagId in tagsPagePaths) {
    const pages = tagsPagePaths[tagId];
    pages.forEach((page) => {
      tagPageDynamicPaths.push({
        url: `${baseURL}tag/${tagId}/page/${page}/`,
        lastModified: _lastModified,
      });
    });
  }

  const articles = articleInfo.articles;
  const articlesDynamicPaths = articles.map((article) => {
    return {
      url: `${baseURL}articles/${article.id}/`,
      lastModified: new Date(article.createdAt), // 記事ごとの作成日時
    };
  });

  // 動的ページをまとめる
  const dynamicPaths = [
    ...allArticlesPageDynamicPaths,
    ...categoriesDynamicPaths,
    ...categoryPageDynamicPaths,
    ...tagsDynamicPaths,
    ...tagPageDynamicPaths,
    ...articlesDynamicPaths,
  ];
  // console.log("dynamicPaths => ", dynamicPaths);

  // 静的ページと動的ページを合わせたものを返す
  return [...staticPaths, ...dynamicPaths];
}
