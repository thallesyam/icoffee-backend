import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { routes } from "./routes"
import { PrismaClient } from ".prisma/client"

dotenv.config()

export const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(routes)

const port = 5000
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
