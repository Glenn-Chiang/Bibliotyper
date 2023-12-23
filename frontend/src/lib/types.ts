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
  id: number;
  username: string;
}

export interface ScorePayload {
  userId: number;
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
  userId: number;
  _max: { wpm: number };
}
