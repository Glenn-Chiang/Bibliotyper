import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { GameStateContext } from "../contexts/GamestateContext";

type TimerProps = {
  timeLimit: number;
  endGame: () => void;
};

export const Timer = ({ timeLimit, endGame }: TimerProps) => {
  const gameState = useContext(GameStateContext);
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // Reset timeLeft when timeLimit changes
  useEffect(() => {
    if (gameState === "pre-game") {
      setTimeLeft(timeLimit);
    }
  }, [gameState, timeLimit]);

  // End game when timer reaches 0
  useEffect(() => {
    if (gameState === "in-game" && timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, endGame, gameState]);

  // Decrement timer
  useEffect(() => {
    if (gameState !== "in-game") return;

    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  return (
    <span className="text-sky-500 flex gap-2 items-center p-2">
      <FontAwesomeIcon icon={faClock} />
      {timeLeft}
    </span>
  );
};
