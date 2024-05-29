import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import projectRoutes from './routes/projects.js'
import pdfchatRoutes from './routes/route.chat.js'
//import dboperations from "./db/pgvector.js"
dotenv.config({
    path: './.env'
})



const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use('/api/getpdf', projectRoutes);
app.use('/api/chataboutpdf', pdfchatRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


