import { getArticlesList } from "@/libs/microcms";

// 記事リストを取得する関数
async function fetchArticles() {
  const queries = { limit: 100 };
  const response = await getArticlesList(queries);
  const { data: articles } = await response.json();
  return articles;
}

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
