import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import path from "path";

const app = express();

// DB CONNECT
connectDB();

//  Middleware
app.use(express.json());

// CORS FIX (FINAL 🔥)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://student-note-1-mgnc.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps / postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }),
);

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

//  Static frontend serve
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "frontend", "build")));

//  React fallback (Express v5 safe)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

//  Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
