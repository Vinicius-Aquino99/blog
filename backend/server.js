import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import cors from 'cors'



import authRoutes from './routes/authRoutes.js'
import postsRoutes from './routes/postsRoutes.js'

dotenv.config(  )
const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)


app.listen(PORT, () => console.log(`Servidor rodando no link: http://localhost:${PORT}`))