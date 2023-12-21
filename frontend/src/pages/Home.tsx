import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { useGetQuotes } from "../queries/quotes-api/quotes";
import { AuthorList } from "../components/AuthorList";

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const chunkSize = 5;

  const [searchParams] = useSearchParams();
  const selectedAuthor = searchParams.get("author") || undefined;

  const {isLoading, isError, data: quotes, refetch} = useGetQuotes(selectedAuthor, chunkSize);
  const quote = quotes ? quotes[quoteIndex]?.content : "";

  const [inputText, setInputText] = useState("");
  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setInputText(event.target.value)
  }

  return (
    <main className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1>Authors</h1>
        <AuthorList />
      </section>

      <p>Start typing to begin</p>
      <div>
        <button onClick={() => refetch()} className="bg-sky-100 text-sky-500">
          Change quote
        </button>
      </div>
      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage message="Error getting quotes" />
      ) : (
        <Quotebox quote={quote} inputText={inputText}/>
      )}

      <InputField onInput={handleInput}/>
    </main>
  );
}

type InputFieldProps = {
  onInput: React.ChangeEventHandler<HTMLTextAreaElement>;
};
const InputField = ({ onInput }: InputFieldProps) => {
  return (
    <textarea
      autoFocus
      onChange={onInput}
      className="border-2 shadow p-2 rounded-md"
    />
  );
};

type QuoteboxProps = {
  quote: string;
  inputText: string;
};

const Quotebox = ({ quote, inputText }: QuoteboxProps) => {
  const quoteChars = quote.split("")

  return (
    <section className="rounded-md p-4 bg-slate-100 text-slate-600">
      {quoteChars.map((char, index) => <Letter key={index} quoteChar={char} inputChar={inputText[index]}/>)}
    </section>
  );
};


type LetterProps = {
  quoteChar: string,
  inputChar: string | undefined,
}
const Letter = ({quoteChar, inputChar}: LetterProps) => {
  const grade = inputChar === quoteChar ? 2 : inputChar ? 1 : 0
  const gradeColors = ["text-slate-500", "text-rose-500", "text-teal-500"]
  const color = gradeColors[grade]

  return (
    <span className={color}>{quoteChar}</span>
  )
}