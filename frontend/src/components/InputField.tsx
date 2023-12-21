type InputFieldProps = {
  inputText: string;
  onInput: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const InputField = ({ inputText, onInput }: InputFieldProps) => {
  return (
    <textarea
      value={inputText}
      autoFocus
      onChange={onInput}
      className="border-2 shadow p-2 rounded-md"
    />
  );
};
