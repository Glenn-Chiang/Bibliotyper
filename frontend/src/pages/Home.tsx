import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthorList } from "../components/AuthorList";
import { ErrorMessage } from "../components/ErrorMessage";
import { InputField } from "../components/InputField";
import { LoadingMessage } from "../components/LoadingMessage";
import { Quotebox } from "../components/Quotebox";
import { SettingsMenu } from "../components/SettingsMenu";
import { Gamestate } from "../lib/types";
import { useGetQuotes } from "../queries/quotes-api/quotes";
import { Timer } from "../components/Timer";

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

  const [gameState, setGamestate] = useState<Gamestate>("pre-game");

  const [inputText, setInputText] = useState("");
  const handleInput: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    if (gameState === "pre-game" && inputText) {
      setGamestate("in-game");
    }
    // Fetch new quote and reset input field when user finishes typing current quote
    if (inputText.length === quote.length) {
      refetch();
      setInputText("");
    }
  }, [gameState, inputText, quote, refetch]);

  const [timeLimit, setTimeLimit] = useState(30);
  const handleTimeLimitChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setTimeLimit(Number(event.target.value));
  };

  return (
    <main className="flex flex-col gap-4">
      <AuthorList />
      <SettingsMenu handleChange={handleTimeLimitChange} />
      <div className="justify-between flex">
        <Timer gameState={gameState} timeLimit={timeLimit} />
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
