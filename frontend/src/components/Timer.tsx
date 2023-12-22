import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Gamestate } from "../lib/types";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type TimerProps = {
  gameState: Gamestate;
  timeLimit: number;
  end: () => void;
};

export const Timer = ({ timeLimit, gameState, end }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

    // Reset timer
    useEffect(() => {
      if (gameState === "pre-game") {
        setTimeLeft(timeLimit);
      }
    }, [gameState, timeLimit]);

    // End game when timer reaches 0
    useEffect(() => {
      if (gameState === "in-game" && timeLeft === 0) {
        end()
      }
    }, [timeLeft, end, gameState])

    // Decrement timer
    useEffect(() => {
      if (gameState === "in-game" && timeLeft > 0) {
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
