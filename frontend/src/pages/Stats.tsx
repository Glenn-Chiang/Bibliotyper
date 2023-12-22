import { faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Stats() {
  return (
    <main className="flex flex-col items-center sm:w-1/2 m-auto">
      <h1>
        <FontAwesomeIcon icon={faChartColumn} />
        Your Stats
      </h1>
      
    </main>
  );
}
