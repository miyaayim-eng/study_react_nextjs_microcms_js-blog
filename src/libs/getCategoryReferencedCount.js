import { getArticlesList } from "@/libs/microcms";

// 記事リストを取得する関数
async function fetchArticles() {
  const queries = { limit: 100 };
  const response = await getArticlesList(queries);
  const { data: articles } = await response.json();
  return articles;
}

// カテゴリのカウントを計算する関数
function calculateCategoryCounts(articles) {
  return articles.reduce((counts, article) => {
    const categoryId = article.category.id;
    counts[categoryId] = (counts[categoryId] || 0) + 1;
    return counts;
  }, {});
}

// カテゴリを参照している記事の数を返すメイン関数
export const getCategoryReferencedCount = async () => {
  const articles = await fetchArticles(); // 記事リストを取得
  const categoryCounts = calculateCategoryCounts(articles); // カテゴリカウントを計算
  // console.log("categoryCounts => ", categoryCounts);
  return categoryCounts; // 計算結果を返す
};
