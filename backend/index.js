import authRouter from './routes/authRoutes.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config()
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter)
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
