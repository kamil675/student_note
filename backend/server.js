import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

//  Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB CONNECT
connectDB();

// Middleware
app.use(express.json());

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://student-note-1-mgnc.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Static
app.use(express.static(path.join(process.cwd(), "frontend", "build")));

// React fallback
app.use((req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "build", "index.html"));
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
