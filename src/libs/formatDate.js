import dayjs from "dayjs";

export default function formatDate(date) {
  const formattedDate = dayjs(date).format("YYYY-MM-DD");
  return formattedDate;
}
