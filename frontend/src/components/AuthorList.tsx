import { useSearchParams } from "react-router-dom";
import { useGetAuthors } from "../queries/quotes-api/authors";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingMessage } from "./LoadingMessage";

export const AuthorList = ({ disabled }: { disabled: boolean }) => {
  const { isLoading, isError, data: authors } = useGetAuthors();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedAuthor = searchParams.get("author") || undefined;

  if (isLoading) {
    return <LoadingMessage />;
  }
  if (isError) {
    return <ErrorMessage message="Error getting authors" />;
  }

  return (
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-2 p-2 rounded-md">
      <AuthorButton
        disabled={disabled}
        author={"Random"}
        isActive={!selectedAuthor}
        onClick={() => setSearchParams({})}
      />
      {authors?.map((author) => (
        <AuthorButton
          disabled={disabled}
          key={author.id}
          author={author.name}
          isActive={selectedAuthor === author.name.split(" ").join("_")}
          onClick={() =>
            setSearchParams({ author: author.name.split(" ").join("_") })
          }
        />
      ))}
    </ul>
  );
};

type AuthorButtonProps = {
  author: string;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
};

const AuthorButton = ({
  author,
  isActive,
  onClick,
  disabled,
}: AuthorButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`p-2 rounded ${
        isActive
          ? "text-sky-500 font-medium bg-sky-100"
          : disabled
          ? ""
          : "hover:bg-slate-100"
      } `}
    >
      {author}
    </button>
  );
};
