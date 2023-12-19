import { useParams } from "react-router"
import { useGetArticles } from "../queries/articles";
import { categories } from "../constants";
import { LoadingMessage } from "../components/LoadingMessage";
import { ErrorMessage } from "../components/ErrorMessage";

export default function CategoryPage() {
  const categoryId = Number(useParams().categoryId);
  const categoryName = categories.find(category => category.id == categoryId)?.name;
  const {isLoading, isError, data: articles} = useGetArticles(1, categoryId)
  console.log(articles);

  return (
    <main>
      <h1 className="capitalize text-center">{categoryName }</h1>
      {isLoading ? <LoadingMessage/> :
      isError ? <ErrorMessage message="Error loading articles"/> :
      <ul className="flex flex-col gap-2">
        {articles.map(article => <ArticlePreview article={article}/>)}
      </ul>}
    </main>
  )
}

type ArticleData = {

}

const ArticlePreview = ({article}:{article: ArticleData}) => {
  return (
    <article>

    </article>
  )
}