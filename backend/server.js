import "dotenv/config";
import express from "express";
import connectDB from "./db/connectDatabase.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;
const secret = process.env.COOKIE_SECRET;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://mern-frontend-cyan-mu.vercel.app",
    "https://taskmanager-satyam.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secret));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // ← THIS WAS MISSING

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/streak", streakRoutes); // ← MOVED HERE (was at bottom before, wrong!)

app.get("/", (req, res) => {
  res.json({ message: "Hello, Welcome To Vooshfoods" });
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on PORT: ${PORT}`);
});