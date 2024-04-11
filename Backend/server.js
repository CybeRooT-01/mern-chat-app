import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/messages.routes.js"
import usersRoute from "./routes/users.routes.js"
import mongoDbConnector from "./db/mongodb.connector.js"
import cookieParser from "cookie-parser"
const PORT = process.env.PORT || 5000
const app = express()

dotenv.config()

app.use(express.json());//recuperer le body des request
app.use(cookieParser()) //pour recuperer les donnés des cookies
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoute)
app.use("/api/users", usersRoute)

app.listen(PORT,()=>{
    mongoDbConnector()
    console.log(`Server running on port ${PORT}`)
})