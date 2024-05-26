import { notFound } from "next/navigation";
import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";

export const generateArticlesInfo = async () => {
  const articlesListQueries = { limit: 100 };
  const articlesListResponse = await getArticlesList(articlesListQueries).catch(
    () => notFound()
  );
  const { contents: articles } = articlesListResponse;

  // ページ番号のパス配列を取得
  const getPagePaths = (totalCount) => {
    // ページ番号が2ページ目から開始するように配列を生成し、それをページパスに変換します
    const paths = Array.from({ length: Math.ceil(totalCount / LIMIT) })
      .map((_, i) => i + 1)
      .slice(1); // 最初のページ (i.e., 1) を除外

    // 作成したパスの配列を返します。
    return [...paths];
  };

  // カテゴリ情報を一意に管理するオブジェクトを作成
  const categoryMap = articles.reduce((map, article) => {
    const category = article.category;
    if (!map[category.id]) {
      map[category.id] = category;
    }
    return map;
  }, {});
  // オブジェクトの値を配列に変換
  const categoriesInfo = Object.values(categoryMap);

  // タグ情報を一意に管理するオブジェクトを作成
  const tagMap = articles.reduce((map, article) => {
    article.tags.forEach((tag) => {
      if (!map[tag.id]) {
        map[tag.id] = tag;
      }
    });
    return map;
  }, {});
  // オブジェクトの値を配列に変換
  const tagsInfo = Object.values(tagMap);

  // 各カテゴリーの総記事数を計算
  const categoriesTotalCounts = articles.reduce((counts, article) => {
    const categoryId = article.category.id;
    counts[categoryId] = (counts[categoryId] || 0) + 1;
    return counts;
  }, {});

  // 各タグの総記事数を計算
  const tagsTotalCounts = articles.reduce((counts, article) => {
    article.tags.forEach((tag) => {
      counts[tag.id] = (counts[tag.id] || 0) + 1; // タグIDが既にキーとして存在する場合はカウントアップ、そうでない場合は1を設定
    });
    return counts;
  }, {});

  // 全記事一覧ページでのページ番号の配列
  const articlesTotalCount = articles.length;
  const allArticlesPagePaths = getPagePaths(articlesTotalCount);
  // console.log("articlesTotalCount => ", articlesTotalCount);

  // 各カテゴリーの記事一覧ページ番号のオブジェクト
  const categoriesPagePaths = {}; // 空のオブジェクトとして初期化
  for (const categoryId in categoriesTotalCounts) {
    categoriesPagePaths[categoryId] = getPagePaths(
      categoriesTotalCounts[categoryId]
    );
  }

  // 各タグの記事一覧ページ番号のオブジェクト
  const tagsPagePaths = {}; // 空のオブジェクトとして初期化
  for (const tagId in tagsTotalCounts) {
    tagsPagePaths[tagId] = getPagePaths(tagsTotalCounts[tagId]);
  }

  return {
    articles,
    articlesTotalCount,
    categoriesInfo,
    tagsInfo,
    allArticlesPagePaths,
    categoriesTotalCounts,
    categoriesPagePaths,
    tagsTotalCounts,
    tagsPagePaths,
  };
};
