import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Leaderboard() {
  return (
    <main className="flex flex-col items-center sm:w-1/2 m-auto">
      <h1>
        <FontAwesomeIcon icon={faTrophy} />
        Leaderboard
      </h1>
    </main>
  );
}
