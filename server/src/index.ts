import express from "express"
import authRoutes from "./routes/auth"

const app = express()

app.use("/auth", authRoutes)

app.listen(8080, () => {
    console.log(`App listening on port 8080`)
})