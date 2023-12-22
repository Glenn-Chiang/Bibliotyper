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
import { ScoreCard } from "../components/ScoreCard";

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

  const [timeLimit, setTimeLimit] = useState(5);
  const handleTimeLimitChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setTimeLimit(Number(event.target.value));
  };

  const restart = () => {
    setGamestate("pre-game");
    refetch();
    setInputText("");
  };

  const endGame = () => {
    setGamestate("post-game");
  };

  return (
    <main className="flex flex-col gap-4">
      <AuthorList />
      <SettingsMenu
        handleChange={handleTimeLimitChange}
        gameState={gameState}
      />
      <div className="flex gap-4">
        <Timer gameState={gameState} timeLimit={timeLimit} end={endGame} />
        <button onClick={restart} className="bg-sky-100 text-sky-500">
          <FontAwesomeIcon icon={faRefresh} />
          Restart
        </button>
      </div>

      {gameState !== "post-game" &&
        (isLoading ? (
          <LoadingMessage />
        ) : isError ? (
          <ErrorMessage message="Error getting quotes" />
        ) : (
          <Quotebox quote={quote} inputText={inputText} />
        ))}

      {gameState !== "post-game" && (
        <InputField
          inputText={inputText}
          onInput={handleInput}
          gameState={gameState}
        />
      )}
      {gameState === "post-game" && <ScoreCard />}
    </main>
  );
}
