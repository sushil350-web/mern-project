import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDb } from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cloudinary from "cloudinary";
import cookieParser from 'cookie-parser';
import { isAuth } from './middlewares/isAuth.js';
import { User } from './models/userModel.js';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

// API Root route
app.get("/", (req, res) => {
  res.send("Server working");
});

// Get all users route
app.get("/api/user/all", isAuth, async (req, res) => {
  try {
    const search = req.query.search || "";

    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      _id: {
        $ne: req.user._id,
      },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const port = process.env.PORT || 7000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
