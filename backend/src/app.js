import express from "express";
import cors from "cors"
import userRouter from "./routes/user"
import accountRouter from "./routes/account"
import transactionRouter from "./routes/transaction"
import errorHandler from "./middlewares/errorHandler"

import "./database/mongoose"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/user/", userRouter)
app.use("/account/", accountRouter)
app.use("/transaction/", transactionRouter)

app.use(errorHandler)

export default app