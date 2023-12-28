import express from "express";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";
configDotenv();
import { applicationDefault, initializeApp } from "firebase-admin/app";

initializeApp({
  credential: applicationDefault(),
});

import { scoresRouter } from "./controllers/scores.js";
import { usersRouter } from "./controllers/users.js";
import { verifyToken } from "./middleware/verifyToken.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Hello from Bibliotyper");
});

app.use(verifyToken);
app.use(scoresRouter, usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
