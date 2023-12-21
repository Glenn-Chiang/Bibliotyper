import { Gamestate } from "../lib/types";
type InputFieldProps = {
  inputText: string;
  onInput: React.ChangeEventHandler<HTMLTextAreaElement>;
  gameState: Gamestate;
};

export const InputField = ({
  inputText,
  onInput,
  gameState,
}: InputFieldProps) => {
  return (
    <textarea
      disabled={gameState === "post-game"}
      value={gameState === "post-game" ? "": inputText}
      autoFocus
      onChange={onInput}
      className="border-2 shadow p-2 rounded-md"
    />
  );
};
