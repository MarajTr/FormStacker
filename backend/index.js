import authRouter from './routes/authRoutes.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from '@supabase/supabase-js';


dotenv.config()
const app = express();
const PORT = 5000;
const  supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const allowedOrigins = [
  "https://form-stacker.vercel.app",
  "https://form-stacker-3jtw9ntk5-marajtrs-projects.vercel.app",
  "https://form-stacker-256fkxae8-marajtrs-projects.vercel.app",
  "http://localhost:5000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/auth', authRouter)
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
export default supabase;
export { supabase };  