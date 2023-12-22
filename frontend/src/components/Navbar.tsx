import { faKeyboard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="w-screen top-0 left-0 fixed bg-sky-500 text-white h-16 shadow flex items-center p-4 text-xl">
      <Link to={'/'} className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faKeyboard}/>
        Bibliotyper
      </Link>
    </nav>
  )
}