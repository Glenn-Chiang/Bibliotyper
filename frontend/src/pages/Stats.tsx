import {
  faBullseye,
  faChartColumn,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import { useCurrentUser } from "../auth/useCurrentUser";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingMessage } from "../components/LoadingMessage";
import { SortDropdown } from "../components/SortDropdown";
import { TimeDropdown } from "../components/TimeDropdown";
import { Score } from "../lib/types";
import { useGetUserScores } from "../queries/backend/scores";

export default function Stats() {
  const [selectedTime, setSelectedTime] = useState(15);
  const [selectedSort, setSelectedSort] = useState("newest");

  const currentUser = useCurrentUser();
  const userId = currentUser?.uid || null;

  const {
    isLoading,
    isError,
    data: scores,
  } = useGetUserScores(userId, selectedTime, selectedSort);

  return (
    <main className="flex flex-col gap-4 items-center sm:w-2/3 m-auto">
      <h1>
        <FontAwesomeIcon icon={faChartColumn} />
        Your Stats
      </h1>

      <div className="w-full flex justify-between">
        <TimeDropdown
          selectedValue={selectedTime}
          handleChange={(event) => setSelectedTime(Number(event.target.value))}
        />
        <SortDropdown
          selectedValue={selectedSort}
          handleChange={(event) => setSelectedSort(event.target.value)}
        />
      </div>

      {isLoading ? (
        <LoadingMessage />
      ) : isError ? (
        <ErrorMessage message="Error getting scores" />
      ) : scores?.length ? (
        <ul className="flex flex-col gap-2 w-full items-center">
          {scores?.map((score) => (
            <ScoreItem key={score.id} score={score} />
          ))}
        </ul>
      ) : (
        <p className="text-slate-500">No scores to display</p>
      )}
    </main>
  );
}

const ScoreItem = ({ score }: { score: Score }) => {
  return (
    <li className="flex gap-2 justify-center w-full p-4 rounded-md bg-slate-100">
      <div className="flex flex-col w-full items-center gap-4 text-slate-500 border-r-2">
        <div>
          <span>{new Date(score.dateAdded).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-1 items-center">
          <FontAwesomeIcon icon={faClock} />
          <span>{score.time}</span>
        </div>
        <div>{score.author.split("_").join(" ")}</div>
      </div>

      <div className="flex flex-col w-full items-center gap-4 justify-center text-sky-500">
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
