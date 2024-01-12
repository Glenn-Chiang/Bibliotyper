import {
  faArrowRightRotate,
  faChevronDown,
  faChevronUp,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [authorsVisible, setAuthorsVisible] = useState(false);

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

  const [inputText, setInputText] = useState("");
  const [cursorIdx, setCursorIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore keys that are neither a character nor backspace
      if (event.key.length !== 1 && event.key !== "Backspace") return;

      // Start game when user starts typing
      if (gameState === 'pre-game') {
        startGame();
      }

      // Backspace
      if (event.key === "Backspace") {
        setInputText((inputText) => inputText.slice(0, inputText.length - 1));
        setCursorIdx((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        // Add character
        setInputText((inputText) => inputText + event.key);
        setCursorIdx((prev) => prev + 1);
        // correct
        if (quote[cursorIdx] === event.key) {
          setCorrectKeystrokes((prev) => prev + 1);
        }
        setTotalKeystrokes((prev) => prev + 1);
      }
    },
    [quote, cursorIdx, gameState]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  // When user finishes typing current quote, fetch next quote
  useEffect(() => {
    const fetchNext = async () => {
      await refetch();
      setInputText("");
      setCursorIdx(0);
    };
    if (inputText.length === quote.length) {
      fetchNext();
    }
  }, [inputText, quote, refetch]);

  const timerRef = useRef<NodeJS.Timeout>();

  // When timer runs out, end game and clear timer
  useEffect(() => {
    if (timeLeft === 0) {
      setGamestate("post-game");
      clearInterval(timerRef.current);
      document.removeEventListener("keydown", handleKeydown);
    }
  }, [timeLeft, handleKeydown]);

  const startGame = () => {
    setGamestate("in-game");
    timerRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  };

  const handleRestart: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.currentTarget.blur(); // onfocus button
    clearInterval(timerRef.current);
    setGamestate("pre-game");
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setInputText("");
    setCursorIdx(0);
    setTimeLeft(timeLimit);
    await refetch();
  };

  const handleSkip: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.currentTarget.blur();
    await refetch();
    setInputText("");
    setCursorIdx(0);
  };

  const handleTimeLimitChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = async (event) => {
    const newTimeLimit = Number(event.target.value);
    setTimeLimit(newTimeLimit);
    setTimeLeft(newTimeLimit);
  };

  return (
    <GameStateContext.Provider value={gameState}>
      <main className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <p>Select an author</p>
          <button onClick={() => setAuthorsVisible((prev) => !prev)}>
            {authorsVisible ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
        </div>
        {authorsVisible && <AuthorList />}
        <div>
          Selected:{" "}
          <span className="text-sky-500">
            {selectedAuthor ? selectedAuthor.split("_").join(" ") : "Random"}
          </span>
        </div>

        <div className="rounded-md p-2 border-2 flex flex-col gap-2">
          <TimeDropdown
            selectedValue={timeLimit}
            handleChange={handleTimeLimitChange}
          />
        </div>

        <div className="flex gap-4">
          {gameState !== "post-game" && (
            <>
              <Timer timeLeft={timeLeft} />
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
        {gameState === "pre-game" && (
          <p className="px-2">Start typing to begin</p>
        )}
        {gameState !== "post-game" &&
          (isLoading ? (
            <LoadingMessage />
          ) : isError ? (
            <ErrorMessage message="Error getting quotes" />
          ) : (
            <Quotebox quote={quote} inputText={inputText} />
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
