type QuoteboxProps = {
  quote: string;
  inputText: string;
};

export const Quotebox = ({ quote, inputText }: QuoteboxProps) => {
  const quoteChars = quote.split("");

  return (
    <>
      <p className="rounded-md p-4 bg-slate-100 text-slate-600 text-lg">
        {quoteChars.map((char, index) => (
          <Letter key={index} quoteChar={char} inputChar={inputText[index]} />
        ))}
      </p>
    </>
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
