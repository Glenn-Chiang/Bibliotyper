import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Gamestate } from "../lib/types";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type TimerProps = {
  gameState: Gamestate;
  timeLimit: number;
  end: () => void
};

export const Timer = ({ timeLimit, gameState, end }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // Change initial timeLeft when time limit is changed
  useEffect(() => {
    setTimeLeft(timeLimit)
  }, [timeLimit])

  useEffect(() => {
    if (timeLeft === 0) {
      end()
    }
  }, [timeLeft, end])

  // Decrement timer
  useEffect(() => {
    if (gameState !== "in-game") return;

    if (timeLeft > 0) {
      setTimeout(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } 
  }, [gameState, timeLeft]);

  return (
    <span className="text-sky-500 flex gap-2 items-center p-2">
      <FontAwesomeIcon icon={faClock} />
      {timeLeft}
    </span>
  );
};
