import { createContext } from "react";
import { Gamestate } from "../lib/types";

export const GameStateContext = createContext<Gamestate>("pre-game")