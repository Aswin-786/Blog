import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user";
import postRouter from "./routes/post";

const app = express();
const uploadsDirectory = path.join(__dirname, "../uploads");

app.use(express.json());
app.use(
  cors({ credentials: true, origin: "https://blognest.aswinkrishna.com" })
);
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/uploads", express.static(uploadsDirectory));

const mongoUrl = process.env.MONGO;
if (!mongoUrl) {
  console.error("wrong mongo url");
  process.exit(1);
}
mongoose.connect(mongoUrl);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hi to all checking 11" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
