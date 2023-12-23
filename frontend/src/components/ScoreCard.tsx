import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetUserBest, useSaveScore } from "../queries/backend/scores";
import { LoadingMessage } from "./LoadingMessage";
import { ErrorMessage } from "./ErrorMessage";
import { useCurrentUser } from "../auth/useCurrentUser";
import { useState } from "react";

type ScoreCardProps = {
  totalKeystrokes: number;
  correctKeystrokes: number;
  time: number;
  author?: string;
};

export const ScoreCard = ({
  totalKeystrokes,
  correctKeystrokes,
  time,
  author,
}: ScoreCardProps) => {
  const cpm = correctKeystrokes / (time / 60);
  const wpm = Math.round(cpm / 5);
  const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);

  const userId = useCurrentUser()?.id || null;

  const [saved, setSaved] = useState(false);
  const saveScore = useSaveScore();
  const handleSave = () => {
    saveScore.mutate({
      userId,
      time,
      author: author || "Random",
      wpm,
      accuracy,
    });
    setSaved(true);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <section className="sm:w-1/2 flex justify-center items-center flex-col gap-2 rounded-md p-4 border-2 text-slate-500">
        <span>Your score</span>
        <div className="text-2xl text-sky-500">
          <span>{wpm}</span> WPM
        </div>
        <div>
          <span>{accuracy}%</span> accuracy
        </div>
        {saved ? (
          <p className="bg-teal-100 text-teal-500 p-2 rounded">Score saved</p>
        ) : (
          <button onClick={handleSave} className="bg-sky-100 text-sky-500">
            Save score
          </button>
        )}
      </section>
      <section className="sm:w-1/2 flex justify-center items-center flex-col gap-2 rounded-md p-4 border-2 text-slate-500">
        <span className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faTrophy} className="text-amber-400" />
          Personal best
        </span>
        <PersonalBest wpm={wpm} time={time} />
      </section>
    </div>
  );
};

const PersonalBest = ({ wpm, time }: { wpm: number; time: number }) => {
  const userId = useCurrentUser()?.id || null;
  const { isLoading, isError, data: highScore } = useGetUserBest(userId, time);

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ErrorMessage message="Error getting high score" />;
  }
  return (
    <>
      {highScore.wpm && (
        <div className="text-2xl text-sky-500">
          <span>{highScore.wpm}</span> WPM
        </div>
      )}
      {highScore.wpm && wpm > highScore.wpm && (
        <p className="rounded p-2 bg-teal-100 text-teal-500">
          Congratulations! You beat your personal best!
        </p>
      )}

      {!highScore.wpm && (
        <p className="italic">No scores recorded for this time setting</p>
      )}
    </>
  );
};
