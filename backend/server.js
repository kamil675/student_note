import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import path from "path";

dotenv.config();

const app = express();
connectDB();

const __dirname = path.resolve();

app.use(express.json());

/* ---------------- CORS CONFIG ---------------- */
app.use(
  cors({
    origin: "https://student-note-1-mgnc.onrender.com",
    credentials: true,
  }),
);

/* ---------------- API ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

/* ---------------- FRONTEND STATIC FILES (CRA BUILD) ---------------- */
app.use(express.static(path.join(process.cwd(), "frontend", "build")));

app.use((req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "build", "index.html"));
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
