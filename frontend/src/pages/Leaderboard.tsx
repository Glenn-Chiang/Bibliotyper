import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { HighScore } from "../lib/types";
import { useGetTopScores } from "../queries/backend/scores";

export default function Leaderboard() {
  const [selectedTime, setSelectedTime] = useState(30);
  const { isLoading, isError, data: scores } = useGetTopScores(selectedTime);

  return (
    <main className="flex flex-col gap-4 items-center sm:w-2/3 m-auto">
      <h1>
        <FontAwesomeIcon icon={faTrophy} />
        Leaderboard
      </h1>
      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage message="Error getting scores" />
      ) : (
        <ul className="flex flex-col gap-2 w-full items-center">
          {scores?.map((score, index) => (
            <HighScoreItem score={score} rank={index + 1} />
          ))}
        </ul>
      )}
    </main>
  );
}

const HighScoreItem = ({ score, rank }: { score: HighScore; rank: number }) => {
  return (
    <li className="w-full p-4 rounded-md bg-slate-100 flex items-center justify-between gap-2">
      <div className="flex gap-4 items-center">
        <span
          className={`rounded-full w-8 h-8 flex justify-center items-center  ${
            rank === 1
              ? "bg-amber-400 text-white"
              : rank === 2
              ? "bg-gray-300 text-white"
              : rank === 3
              ? "bg-amber-600 text-white"
              : "text-slate-500"
          }`}
        >
          {rank}
        </span>
        <span>{score.user.username}</span>
      </div>
      <span className="text-xl text-sky-500">{score._max.wpm} WPM</span>
    </li>
  );
};
