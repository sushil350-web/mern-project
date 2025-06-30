import express from 'express';
import dotenv from 'dotenv';
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

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("Server working");
});

// Get all users route with fix: correct variable name and search logic
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

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const port = process.env.PORT || 7000;

// Connect to DB, then start server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
