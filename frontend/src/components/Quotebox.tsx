import { useCallback, useEffect, useState } from "react";
import { QueryObserverResult } from "react-query";

type QuoteboxProps = {
  quote: string;
  startGame: () => void;
  refetch: () => Promise<QueryObserverResult>;
  addKeystroke: () => void;
  addCorrectKeystroke: () => void
};

export const Quotebox = ({ quote, startGame, refetch, addCorrectKeystroke, addKeystroke }: QuoteboxProps) => {
  const [inputText, setInputText] = useState("");
  const quoteChars = quote.split("");
  const [cursorIdx, setCursorIdx] = useState(0);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore keys that are neither a character nor backspace
      if (event.key.length !== 1 && event.key !== "Backspace") return;

      // Start game when user starts typing
      startGame();

      // Backspace
      if (event.key === "Backspace") {
        setInputText((inputText) => inputText.slice(0, inputText.length - 1));
        setCursorIdx(prev => prev > 0 ? prev - 1 : 0)
      // Add character
      } else {
        setInputText((inputText) => inputText + event.key);
        setCursorIdx(prev => prev + 1)
        // correct
        if (quote[cursorIdx] === event.key) {
          addCorrectKeystroke()
        }
        addKeystroke()
      }
    },
    [startGame, quote, cursorIdx, addCorrectKeystroke, addKeystroke]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  // When user finishes typing current quote, refetch quote
  useEffect(() => {
    const fetchNext = async () => {
      if (inputText.length === quote.length) {
        await refetch();
        setInputText("");
        setCursorIdx(0)
      }
    }
    fetchNext()
  }, [inputText, quote, refetch]);

  // Reset input when quote changes due to restart
  useEffect(() => {
    setInputText("");
    setCursorIdx(0)
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
