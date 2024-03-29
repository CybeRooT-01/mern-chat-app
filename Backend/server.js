import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import mongoDbConnector from "./db/mongodb.connector.js"

const PORT = process.env.PORT || 5000
const app = express()

dotenv.config()

app.use(express.json());//recuperer le body des request
app.use("/api/auth", authRoutes)

app.listen(PORT,()=>{
    mongoDbConnector()
    console.log(`Server running on port ${PORT}`)
})