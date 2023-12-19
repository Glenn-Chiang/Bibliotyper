import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
configDotenv()
import { articlesRouter } from './routes/articles.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/articles", articlesRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})

