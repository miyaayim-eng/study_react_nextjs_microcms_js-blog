import { notFound } from "next/navigation";
import { getTags } from "@/libs/microcms";

// タグページにて現在のタグ名を取得
export async function fetchTagName(tagId) {
  try {
    const filters = `id[equals]${tagId}`;
    const queries = { fields: "name", filters: filters };
    const tagsResponse = await getTags(queries);
    const { data: tags } = await tagsResponse.json();
    return tags[0].name;
  } catch (error) {
    console.error("fetchTagNameでエラーが発生しました => ", error);
    notFound();
  }
}
