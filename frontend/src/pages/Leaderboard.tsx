import { faMedal, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { HighScore } from "../lib/types";
import { useGetTopScores } from "../queries/backend/scores";
import { TimeDropdown } from "../components/TimeDropdown";
import { useCurrentUser } from "../auth/useCurrentUser";

export default function Leaderboard() {
  const [selectedTime, setSelectedTime] = useState(15);
  const { isLoading, isError, data: scores } = useGetTopScores(selectedTime);

  const currentUser = useCurrentUser();
  const rank =
    scores && currentUser
      ? scores?.findIndex((score) => score.userId === currentUser.id) + 1
      : undefined;

  return (
    <main className="flex flex-col gap-4 items-center sm:w-2/3 m-auto">
      <h1>
        <FontAwesomeIcon icon={faTrophy} />
        Leaderboard
      </h1>

      <div className="w-full flex justify-between">
        <TimeDropdown
          selectedValue={selectedTime}
          handleChange={(event) => setSelectedTime(Number(event.target.value))}
        />
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faMedal} />
          <span>Your rank:</span>
          <span className="text-sky-500">{rank || "-"}</span>
        </div>
      </div>

      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage message="Error getting scores" />
      ) : scores?.length ? (
        <ul className="flex flex-col gap-2 w-full items-center">
          {scores?.map((score, index) => (
            <HighScoreItem key={index} score={score} rank={index + 1} />
          ))}
        </ul>)
        : <p className="text-slate-500 italic">No scores recorded</p>
      }
    </main>
  );
}

const HighScoreItem = ({ score, rank }: { score: HighScore; rank: number }) => {
  const currentUser = useCurrentUser();
  const isSelf = currentUser?.id === score.userId;

  return (
    <li
      className={`w-full p-4 rounded-md flex items-center justify-between gap-2 ${
        isSelf ? "bg-sky-100 font-medium" : "bg-slate-100"
      }`}
    >
      <div className="flex gap-4 items-center">
        <span
          className={`rounded-full w-8 h-8 flex justify-center items-center  ${
            rank === 1
              ? "bg-amber-400 text-white"
              : rank === 2
              ? "bg-gray-300 text-white"
              : rank === 3
              ? "bg-amber-500 text-white"
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
