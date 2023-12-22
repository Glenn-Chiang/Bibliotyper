import { useCallback, useEffect, useState } from "react";

type QuoteboxProps = {
  quote: string;
  startGame: () => void;
  refetch: () => void;
};

export const Quotebox = ({ quote, startGame, refetch }: QuoteboxProps) => {
  const [inputText, setInputText] = useState("");

  const quoteChars = quote.split("");

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore keys that are neither a character nor backspace
      if (event.key.length !== 1 && event.key !== "Backspace") return;

      // Start game when user starts typing
      startGame();

      // Backspace
      if (event.key === "Backspace") {
        setInputText((inputText) => inputText.slice(0, inputText.length - 1));
        // Add character
      } else {
        setInputText((inputText) => inputText + event.key);
      }
    },
    [startGame]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  // When user finishes typing current quote, refetch quote
  useEffect(() => {
    if (inputText.length === quote.length) {
      refetch();
      setInputText("");
    }
  }, [inputText, quote, refetch]);

  // Reset input when quote changes
  useEffect(() => {
    setInputText("");
  }, [quote]);

  return (
    <p className="rounded-md p-4 bg-slate-100 text-slate-600 text-lg">
      {quoteChars.map((char, index) => (
        <Letter key={index} quoteChar={char} inputChar={inputText[index]} />
      ))}
    </p>
  );
};

type LetterProps = {
  quoteChar: string;
  inputChar: string | undefined;
};
const Letter = ({ quoteChar, inputChar }: LetterProps) => {
  const grade = inputChar === quoteChar ? 2 : inputChar ? 1 : 0;
  const gradeStyles = [
    "text-slate-500",
    "text-rose-500 border-b-2 border-rose-500",
    "text-teal-500 border-b-2 border-teal-500",
  ];
  const style = gradeStyles[grade];

  return <span className={style}>{quoteChar}</span>;
};
