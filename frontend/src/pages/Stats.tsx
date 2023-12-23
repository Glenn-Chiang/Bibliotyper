import {
  faBullseye,
  faChartColumn,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUserScores } from "../queries/backend/scores";
import { useCurrentUser } from "../lib/auth";
import { useState } from "react";
import { LoadingMessage } from "../components/LoadingMessage";
import { ErrorMessage } from "../components/ErrorMessage";
import { Score } from "../lib/types";

export default function Stats() {
  const [selectedTime, setSelectedTime] = useState(30);

  const userId = useCurrentUser().id;
  
  const {
    isLoading,
    isError,
    data: scores,
  } = useGetUserScores(userId, selectedTime);

  return (
    <main className="flex flex-col gap-4 items-center sm:w-1/2 m-auto">
      <h1>
        <FontAwesomeIcon icon={faChartColumn} />
        Your Stats
      </h1>
      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage message="Error getting scores" />
      ) : (
        <ul className="flex flex-col gap-2 w-full items-center">
          {scores?.map((score) => (
            <ScoreItem key={score.id} score={score} />
          ))}
        </ul>
      )}
    </main>
  );
}

const ScoreItem = ({ score }: { score: Score }) => {
  return (
    <li className="flex gap-2 flex-col items-center bg-sky-100 w-full p-4 rounded-md">
      <div className="flex gap-4 text-slate-500">
        <div><span>{new Date(score.dateAdded).toLocaleDateString()}</span></div>
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faClock} />
          <span>{score.time}</span>
        </div>
        <div>{score.author}</div>
      </div>
      <div className="flex gap-4 justify-center text-sky-500">
        <div className="text-xl">
          <span>{score.wpm}</span> WPM
        </div>
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faBullseye} /> <span>{score.accuracy}%</span>
        </div>
      </div>
    </li>
  );
};
