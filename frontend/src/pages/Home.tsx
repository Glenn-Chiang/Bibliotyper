import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { useGetQuotes } from "../queries/quotes-api/quotes";
import { AuthorList } from "../components/AuthorList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { SettingsMenu } from "../components/SettingsMenu";

export default function Home() {
  const [searchParams] = useSearchParams();
  const selectedAuthor = searchParams.get("author") || undefined;

  const {
    isLoading,
    isError,
    data: quotes,
    refetch,
  } = useGetQuotes(selectedAuthor);
  const quote = quotes ? quotes[0]?.content : "";

  const [inputText, setInputText] = useState("");
  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    if (inputText.length === quote.length) {
      refetch();
      setInputText("");
    }
  }, [inputText, quote, refetch]);

  const [timeLimit, setTimeLimit] = useState(30);
  const handleTimeLimitChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTimeLimit(Number(event.target.value))
  }
  const timeLeft = timeLimit

  return (
    <main className="flex flex-col gap-4">
      <AuthorList />
      <SettingsMenu
        handleChange={handleTimeLimitChange}
      />
      <div className="justify-between flex">
        <span className="text-sky-500 flex gap-2 items-center p-2">
          <FontAwesomeIcon icon={faClock}/>
          {timeLeft}
        </span>
        <button onClick={() => refetch()} className="bg-sky-100 text-sky-500">
          <FontAwesomeIcon icon={faRefresh} />
          Change quote
        </button>
      </div>
      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage message="Error getting quotes" />
      ) : (
        <Quotebox quote={quote} inputText={inputText} />
      )}

      <InputField inputText={inputText} onInput={handleInput} />
    </main>
  );
}

type InputFieldProps = {
  inputText: string;
  onInput: React.ChangeEventHandler<HTMLTextAreaElement>;
};
const InputField = ({ inputText, onInput }: InputFieldProps) => {
  return (
    <textarea
      value={inputText}
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
  const quoteChars = quote.split("");

  return (
    <p className="rounded-md p-4 bg-slate-100 text-slate-600 text-lg">
      {quoteChars.map((char, index) => (
        <Letter key={index} quoteChar={char} inputChar={inputText[index]} />
      ))}
    </p>
  );
};

type LetterProps = {
  quoteChar: string;
  inputChar: string | undefined;
};
const Letter = ({ quoteChar, inputChar }: LetterProps) => {
  const grade = inputChar === quoteChar ? 2 : inputChar ? 1 : 0;
  const gradeColors = ["text-slate-500", "text-rose-500", "text-teal-500"];
  const color = gradeColors[grade];

  return <span className={color}>{quoteChar}</span>;
};
