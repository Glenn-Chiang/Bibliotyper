import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { useGetQuotes } from "../queries/quotes-api/quotes";
import { AuthorList } from "../components/AuthorList";

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const chunkSize = 5

  const [searchParams] = useSearchParams();
  const selectedAuthor = searchParams.get("author") || undefined;

  const quotesQuery = useGetQuotes(selectedAuthor, chunkSize);
  const quotes = quotesQuery.data;
  const quote = quotes ? quotes[quoteIndex]?.content : "";

  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1>Authors</h1>
        <AuthorList/>
      </section>

      <p>Start typing to begin</p>
      {quotesQuery.isLoading ? (
        <LoadingMessage />
      ) : quotesQuery.isError ? (
        <ErrorMessage message="Error getting quotes" />
      ) : (
        <Textbox text={quote} />
      )}

      <InputField/>
    </main>
  );
}

const InputField = () => {
  return (
    <textarea autoFocus className="border-2 shadow p-2 rounded-md"/>
  )
}

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
