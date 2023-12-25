import {
  faArrowRightRotate,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthorList } from "../components/AuthorList";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { Quotebox } from "../components/Quotebox";
import { ScoreCard } from "../components/ScoreCard";
import { TimeDropdown } from "../components/TimeDropdown";
import { Timer } from "../components/Timer";
import { GameStateContext } from "../contexts/GamestateContext";
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
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);

  const handleTimeLimitChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setTimeLimit(Number(event.target.value));
  };

  const handleRestart: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.currentTarget.blur(); // onfocus button
    await refetch();
    setGamestate("pre-game");
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
  };

  const handleSkip: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.currentTarget.blur();
    await refetch();
  };

  return (
    <GameStateContext.Provider value={gameState}>
      <main className="flex flex-col gap-4">
        <p className="px-2">Select an author</p>
        <AuthorList />

        <div className="rounded-md p-2 border-2 flex flex-col gap-2">
          <TimeDropdown
            selectedValue={timeLimit}
            handleChange={handleTimeLimitChange}
          />
        </div>

        <div className="flex gap-4">
          {gameState !== "post-game" && (
            <>
              <Timer
                timeLimit={timeLimit}
                endGame={() => setGamestate("post-game")}
              />
              <button onClick={handleSkip} className="bg-sky-100 text-sky-500">
                <FontAwesomeIcon icon={faArrowRightRotate} />
                Skip
              </button>
            </>
          )}
          <button onClick={handleRestart} className="bg-sky-100 text-sky-500">
            <FontAwesomeIcon icon={faRefresh} />
            Restart
          </button>
        </div>
        {gameState === "pre-game" && <p className="px-2">Start typing to begin</p>}
        {gameState !== "post-game" &&
          (isLoading ? (
            <LoadingMessage />
          ) : isError ? (
            <ErrorMessage message="Error getting quotes" />
          ) : (
            <Quotebox
              quote={quote}
              startGame={() => setGamestate("in-game")}
              refetch={refetch}
              addKeystroke={() => setTotalKeystrokes((prev) => prev + 1)}
              addCorrectKeystroke={() =>
                setCorrectKeystrokes((prev) => prev + 1)
              }
            />
          ))}

        {gameState === "post-game" && (
          <ScoreCard
            totalKeystrokes={totalKeystrokes}
            correctKeystrokes={correctKeystrokes}
            time={timeLimit}
            author={selectedAuthor}
          />
        )}
      </main>
    </GameStateContext.Provider>
  );
}
