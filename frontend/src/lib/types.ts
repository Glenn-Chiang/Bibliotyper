export type Author = {
  id: string,
  name: string
}

export type Quote = {
  id: string,
  content: string,
  author: Author
}

export type Gamestate = "pre-game" | "in-game" | "post-game"