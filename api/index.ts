import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User";
import Post from "./models/Post";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { uploadMiddleware } from "./middleware/fileUpload";
import { fs } from "./middleware/fileUpload";
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
const salt = bcrypt.genSaltSync(10);
const SECRET = "jdkshfaksjfkjads";
const mongoUrl = process.env.MONGO;

if (!mongoUrl) {
  console.error("wron mongo url");
  process.exit(1);
}
mongoose.connect(mongoUrl);

interface UserDetails {
  username: string;
  password: string;
}

interface Token {
  token: string;
}

interface PostDetails {
  id: string;
  title: string;
  summary: string;
  content: string;
}

app.post("/register", async (req, res) => {
  const inputs: UserDetails = req.body;
  try {
    const userDoc = await User.create({
      username: inputs.username,
      password: bcrypt.hashSync(inputs.password, salt),
    });
    res.status(201).json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const inputs: UserDetails = req.body;
  try {
    const userDoc = await User.findOne({ username: inputs.username });
    if (userDoc) {
      const passOk = bcrypt.compareSync(inputs.password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { username: inputs.username, id: userDoc._id },
          SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              id: userDoc._id,
              username: inputs.username,
            });
          }
        );
      } else {
        res.status(401).json({ message: "wrong credentials" });
      }
    } else {
      res.status(401).json({ message: "wrong user name" });
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

app.get("/profile", (req, res) => {
  const { token }: Token = req.cookies;
  jwt.verify(token, SECRET, {}, (err, info) => {
    if (err) throw err;
    res.status(200).json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", " ").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file || {};
  if (!originalname) return res.status(401).json({ message: "file missing" });
  if (!path) return res.status(401).json({ message: "file missing" });
  const ext = originalname.split(".")[1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token }: Token = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content }: PostDetails = req.body;
    if (!info) return res.status(401).json({ message: "error occurs in info" });
    if (typeof info === "string")
      return res.status(401).json({ message: "error occurs in info" });
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.status(201).json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const data = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(data);
});

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.status(200).json(postDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put(`/post`, uploadMiddleware.single("file"), async (req, res) => {
  try {
    let newPath: fs.PathLike | null = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split(".")[1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
    const { token }: Token = req.cookies;
    jwt.verify(token, SECRET, {}, async (err, info) => {
      if (err) throw err;
      if (!info)
        return res.status(403).json({ message: "error occurs in info" });
      if (typeof info === "string")
        return res.status(403).json({ message: "error occurs in info" });
      const { id, title, summary, content }: PostDetails = req.body;
      const postDoc = await Post.findById(id);
      if (!postDoc) return res.status(403);
      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(401).json("wrong author");
      }
      const updatedCover = newPath ? newPath : postDoc.cover;
      await Post.updateOne(
        { _id: id, author: info.id },
        {
          $set: {
            title,
            summary,
            content,
            cover: updatedCover,
          },
        }
      );
      res.json(postDoc);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.deleteOne({ _id: id });
    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await User.findById(userId).select("username");
    if (userDoc) {
      const postDoc = await Post.find({ author: userId }).sort({
        createdAt: -1,
      });
      res.status(200).json({ userDoc, postDoc });
    } else {
      res.status(404).json({ message: "user is not there" });
    }
  } catch (error) {
    res.status(500).json("Internal error");
  }
});

app.listen(4000);
