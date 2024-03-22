import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function PublishDate({ date }) {
  const utcDate = new Date(date);
  const jstDate = utcToZonedTime(utcDate, "Asia/Tokyo");
  return <span>{format(jstDate, "yyyy/MM/dd")}</span>;
}
