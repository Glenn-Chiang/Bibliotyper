import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ScoreCardProps = {
  totalKeystrokes: number;
  correctKeystrokes: number;
  time: number;
};

export const ScoreCard = ({
  totalKeystrokes,
  correctKeystrokes,
  time,
}: ScoreCardProps) => {
  const cpm = correctKeystrokes / (time / 60);
  const wpm = Math.round(cpm / 5);
  const accuracy = Math.round((correctKeystrokes / totalKeystrokes) * 100);

  // todo: save score and get personal best

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
      </section>
      <section className="sm:w-1/2 flex justify-center items-center flex-col gap-2 rounded-md p-4 border-2 text-slate-500">
        <span className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faTrophy} className="text-amber-400"/>
          Personal best
        </span>
        <div className="text-2xl text-sky-500">
          <span>{wpm}</span> WPM
        </div>
        <div>
          <span>{accuracy}%</span> accuracy
        </div>
      </section>
    </div>
  );
};
