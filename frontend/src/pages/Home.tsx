import { faClock, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthorList } from "../components/AuthorList";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { Quotebox } from "../components/Quotebox";
import { ScoreCard } from "../components/ScoreCard";
import { SettingsMenu } from "../components/SettingsMenu";
import { Gamestate } from "../lib/types";
import { useGetQuotes } from "../queries/quotes-api/quotes";

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

  const [timeLimit, setTimeLimit] = useState(15);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  const handleTimeLimitChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const newTimeLimit = Number(event.target.value);
    setTimeLimit(newTimeLimit);
    setTimeLeft(newTimeLimit);
  };

  // Decrement timer
  useEffect(() => {
    if (gameState !== "in-game") return;
    if (timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft((timeLeft) => (timeLeft > 0 ? timeLeft - 1 : timeLeft));
      }, 1000);
    } else {
      setGamestate("post-game"); // end game when timer hits 0
    }

  }, [gameState, timeLeft]);

  console.log(gameState, timeLeft)

  const handleRestart: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.currentTarget.blur() // onfocus button
    await refetch();
    setGamestate("pre-game")
    setTimeLeft(timeLimit);
  };

  return (
    <main className="flex flex-col gap-4">
      <AuthorList disabled={gameState !== "pre-game"} />
      <SettingsMenu
        handleChange={handleTimeLimitChange}
        gameState={gameState}
      />
      <div className="flex gap-4">
        <span className="text-sky-500 flex gap-2 items-center p-2">
          <FontAwesomeIcon icon={faClock} />
          {timeLeft}
        </span>
        <button onClick={handleRestart} className="bg-sky-100 text-sky-500">
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
          <Quotebox quote={quote} startGame={() => setGamestate("in-game")} refetch={() => refetch()}/>
        ))}

      {gameState === "post-game" && <ScoreCard />}
    </main>
  );
}
