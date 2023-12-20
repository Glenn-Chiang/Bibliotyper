import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { Author } from "../lib/types";
import { useGetAuthors } from "../queries/quotes-api/authors";
import { useGetQuotes } from "../queries/quotes-api/quotes";

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const authorsQuery = useGetAuthors();
  const authors = authorsQuery.data;

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAuthor = searchParams.get("author") || undefined;

  const quotesQuery = useGetQuotes(selectedAuthor);
  const quotes = quotesQuery.data;
  const quote = quotes ? quotes[quoteIndex]?.content : "";

  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1>Authors</h1>
        {authorsQuery.isLoading ? (
          <LoadingMessage />
        ) : authorsQuery.isError ? (
          <ErrorMessage message="Error getting authors" />
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-2 p-2 rounded-md">
            <AuthorButton author={"Random"} isActive={!selectedAuthor} 
            onClick={() => setSearchParams({})}/>
            {authors?.map((author) => (
              <AuthorButton
                key={author.id}
                author={author.name}
                isActive={selectedAuthor === author.name.replace(" ", "_")}
                onClick={() => setSearchParams({author: author.name.replace(" ", "_")})}
              />
            ))}
          </ul>
        )}
      </section>

      {quotesQuery.isLoading ? (
        <LoadingMessage />
      ) : quotesQuery.isError ? (
        <ErrorMessage message="Error getting quotes" />
      ) : (
        <Textbox text={quote} />
      )}
    </main>
  );
}

type AuthorButtonProps = {
  author: string;
  isActive: boolean;
  onClick: () => void
};

const AuthorButton = ({ author, isActive, onClick }: AuthorButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded ${isActive ? "text-sky-500 font-medium bg-sky-100" : "hover:bg-slate-100"}`}
    >
      {author}
    </button>
  );
};

type TextboxProps = {
  text: string;
};

const Textbox = ({ text }: TextboxProps) => {
  return (
    <section className="rounded-md p-4 bg-slate-100 text-slate-600">
      {text}
    </section>
  );
};
