import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { scoresRouter } from './routes/scores.js'
import { usersRouter } from './routes/users.js'
configDotenv()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.json("Hello from Bibliotyper")
})
app.use(scoresRouter, usersRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})

