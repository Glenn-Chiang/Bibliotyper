export type Author = {
  id: string;
  name: string;
};

export type Quote = {
  id: string;
  content: string;
  author: Author;
};

export type Gamestate = "pre-game" | "in-game" | "post-game";

interface User {
  id: string;
  username: string;
}

export interface ScorePayload {
  userId: string | null;
  time: number;
  author: string;
  wpm: number;
  accuracy: number;
}

export interface Score extends ScorePayload {
  id: string;
  dateAdded: string;
}

export interface HighScore {
  user: User;
  userId: string;
  _max: { wpm: number };
}
