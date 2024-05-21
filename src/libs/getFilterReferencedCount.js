import { getArticlesList } from "@/libs/microcms";
import { LIMIT } from "@/constants";

// 記事リストを取得する関数
async function fetchArticles() {
  const queries = { limit: 100, fields: "category,tags" };
  const response = await getArticlesList(queries);
  const { data: articles } = await response.json();
  return articles;
}

// カテゴリーのカウントを計算する関数
function calculateCategoryCounts(articles) {
  return articles.reduce((counts, article) => {
    const categoryId = article.category.id;
    counts[categoryId] = (counts[categoryId] || 0) + 1;
    return counts;
  }, {});
}

// カテゴリーを参照している記事の数を返すメイン関数
export const getCategoryReferencedCount = async () => {
  const articles = await fetchArticles(); // 記事リストを取得
  const categoryCounts = calculateCategoryCounts(articles); // カテゴリーカウントを計算
  // console.log("categoryCounts => ", categoryCounts);
  return categoryCounts; // 計算結果を返す
};

// タグのカウントを計算する関数
function calculateTagCounts(articles) {
  return articles.reduce((counts, article) => {
    article.tags.forEach((tag) => {
      counts[tag.id] = (counts[tag.id] || 0) + 1; // タグIDが既にキーとして存在する場合はカウントアップ、そうでない場合は1を設定
    });
    return counts;
  }, {});
}

// タグを参照している記事の数を返すメイン関数
export const getTagReferencedCount = async () => {
  const articles = await fetchArticles(); // 記事リストを取得
  const tagCounts = calculateTagCounts(articles); // タグカウントを計算
  // console.log("tagCounts => ", tagCounts);
  return tagCounts; // 計算結果を返す
};

// ページ番号の配列を作成
function getPagesPaths(totalCount) {
  // ページ番号が2ページ目から開始するように配列を生成し、それをページパスに変換します
  const paths = Array.from({ length: Math.ceil(totalCount / LIMIT) })
    .map((_, i) => i + 1)
    .slice(1); // 最初のページ (i.e., 1) を除外

  // 作成したパスの配列を返します。
  return [...paths];
}

export const getPagesReferencedCount = async () => {
  const articles = await fetchArticles(); // 記事リストを取得
  const totalCount = articles.length;
  const pagesArray = getPagesPaths(totalCount);
  console.log("pagesArray => ", pagesArray);
  return pagesArray; // 計算結果を返す
};
