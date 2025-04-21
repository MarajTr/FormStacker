import authRouter from './routes/authRoutes.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config()
const app = express();
const PORT = 5000;

app.use(cors({
  origin: [
    process.env.FRONTEND_URL, // Your Vercel production URL
    'http://localhost:3000'   // Local frontend (React/Vue typically uses port 3000)
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use('/auth', authRouter)
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
