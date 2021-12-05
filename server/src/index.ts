import express from "express"
import authRoutes from "./routes/auth"
import subsRoutes from "./routes/subs"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

mongoose.connect(
    process.env.MONGO_URI as string
)
.then(() => {
    console.log("connected to mongodb ")

    const app = express()

    app.use(express.json())
    app.use(cors())

    app.use("/auth", authRoutes)
    app.use("/subs", subsRoutes)

    app.listen(8080, () => {
        console.log(`App listening on port 8080`)
    })
    
})
.catch((error) => {
    console.error(error)
})


