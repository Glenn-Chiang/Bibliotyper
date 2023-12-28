import { useNavigate } from "react-router";
import { authenticateWithGoogle } from "../../../auth/google";

export const GoogleButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    await authenticateWithGoogle();
    navigate("/");
  };

  return (
    <button type="button" onClick={handleClick} className="bg-slate-100">
      <img src="https://google.com/favicon.ico" className="rounded-full" />
      Continue with Google
    </button>
  );
};
