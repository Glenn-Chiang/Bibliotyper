import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { useGetQuotes } from "../queries/quotes-api/quotes";
import { useGetAuthors } from "../queries/quotes-api/authors";
import { Author } from "../lib/types";
import { Link, useSearchParams } from "react-router-dom";

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
          <ul className="flex flex-col gap-2 flex-wrap">
            {authors?.map((author) => (
              <AuthorButton
                key={author.id}
                author={author}
                isActive={selectedAuthor === author.name.replace(" ", "_")}
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
  author: Author;
  isActive: boolean;
};

const AuthorButton = ({ author, isActive }: AuthorButtonProps) => {
  const authorPathname = author.name.replace(" ", "_");
  return (
    <Link
      to={`?author=${authorPathname}`}
      className={`${isActive ? "text-sky-500" : ""}`}
    >
      {author.name}
    </Link>
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
