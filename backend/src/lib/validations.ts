export const validateUserId = (userId: any) => {
  return userId && typeof userId === "string";
};

export const validateTimeParam = (time: any) => {
  return time && typeof time === "number";
};

export const validateScore = (score: any) => {
  const { wpm, accuracy, author, time } = score;

  return (
    wpm &&
    typeof wpm === "number" &&
    accuracy &&
    typeof accuracy === "number" &&
    author &&
    typeof author === "string" &&
    time &&
    typeof time === "number"
  );
};
