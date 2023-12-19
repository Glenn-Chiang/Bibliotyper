import { useParams } from "react-router";
import { useGetArticles } from "../queries/articles";
import { categories } from "../lib/constants";
import { LoadingMessage } from "../components/LoadingMessage";
import { ErrorMessage } from "../components/ErrorMessage";
import { ArticleData } from "../lib/types";

export default function CategoryPage() {
  const categoryId = Number(useParams().categoryId);
  const categoryName = categories.find(
    (category) => category.id == categoryId
  )?.name;
  const { isLoading, isError, data: articles } = useGetArticles(1, categoryId);

  return (
    <main>
      <h1 className="capitalize text-center">{categoryName}</h1>
      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage message="Error loading articles" />
      ) : (
        <ul className="flex flex-col gap-2">
          {articles?.map((article) => (
            <ArticlePreview key={article.articleId} article={article} />
          ))}
        </ul>
      )}
    </main>
  );
}

const ArticlePreview = ({ article }: { article: ArticleData }) => {
  return <article>{article.title}</article>;
};
