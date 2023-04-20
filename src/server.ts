import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import session from "express-session"
import passport from "passport"
import { PrismaClient } from ".prisma/client"
import "./utils/session"

import { routes } from "./routes"
dotenv.config()

export const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "session",
    cookie: { secure: true },
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(cors())

app.use(routes)

const port = 5000
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})
