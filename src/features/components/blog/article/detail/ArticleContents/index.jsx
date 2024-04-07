import parse from "html-react-parser";
import "./contents.scss";

export const ArticleContents = ({ article }) => {
  return <div className="content">{parse(article.content)}</div>;
};
