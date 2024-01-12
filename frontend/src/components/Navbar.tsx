import {
  faChartColumn,
  faKeyboard,
  faSignIn,
  faSignOut,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../auth/useCurrentUser";

export const Navbar = () => {
  const currentUser = useCurrentUser();
  return (
    <nav className="z-10 w-screen top-0 left-0 fixed bg-sky-500 text-white h-16 shadow flex items-center justify-between p-4 sm:pr-8 text-xl">
      <Link to={"/"} className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faKeyboard} />
        Bibliotyper
      </Link>
      <div className="flex gap-4">
        <Link to={"/leaderboard"}>
          <FontAwesomeIcon icon={faTrophy} />
        </Link>
        {currentUser ? (
          <>
            <Link to={"/stats"}>
              <FontAwesomeIcon icon={faChartColumn} />
            </Link>
            <Link to={"/auth/sign-out"}>
              <FontAwesomeIcon icon={faSignOut} />
            </Link>
          </>
        ) : (
          <Link to={"/auth/sign-in"}>
            <FontAwesomeIcon icon={faSignIn} />
          </Link>
        )}
      </div>
    </nav>
  );
};
