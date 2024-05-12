import { notFound } from "next/navigation";
import { getTags } from "@/libs/microcms";

// タグに登録したサムネイル画像を取得
export async function fetchTagThumbnail(tagId) {
  try {
    const filters = `id[equals]${tagId}`;
    const queries = { fields: "thumbnail", filters: filters };
    const tagsResponse = await getTags(queries);
    const { data: tags } = await tagsResponse.json();
    if (tags[0].thumbnail) {
      return tags[0].thumbnail;
    } else {
      return null;
    }
  } catch (error) {
    console.error("fetchTagThumbnailでエラーが発生しました => ", error);
    notFound();
  }
}
