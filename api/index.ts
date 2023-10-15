import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User";
import Post from "./models/Post";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { uploadMiddleware } from "./middleware/fileUpload";
import { fs } from "./middleware/fileUpload";
import { z } from "zod";
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

const uploadsDirectory = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsDirectory));

const salt = bcrypt.genSaltSync(10);
const SECRET = "jdkshfaksjfkjads";
const mongoUrl = process.env.MONGO;

if (!mongoUrl) {
  console.error("wrong mongo url");
  process.exit(1);
}
mongoose.connect(mongoUrl);

let userInputs = z.object({
  username: z.string().min(1).max(25),
  password: z.string().min(6).max(20),
});

let PostInputs = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(500),
  summary: z.string().min(1),
  content: z.string(),
});

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
  const inputs = userInputs.safeParse(req.body);
  if (!inputs.success) {
    return res.status(411).json({ message: inputs.error });
  }
  try {
    const userDoc = await User.create({
      username: inputs.data.username,
      password: bcrypt.hashSync(inputs.data.password, salt),
    });
    res.status(201).json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const inputs = userInputs.safeParse(req.body);
  if (!inputs.success) {
    return res.status(411).json({ message: inputs.error });
  }
  try {
    const userDoc = await User.findOne({ username: inputs.data.username });
    if (userDoc) {
      const passOk = bcrypt.compareSync(inputs.data.password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { username: inputs.data.username, id: userDoc._id },
          SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              id: userDoc._id,
              username: inputs.data.username,
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
  if (!originalname || !path)
    return res.status(401).json({ message: "file missing" });
  const ext = originalname.split(".")[1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { token }: Token = req.cookies;
  jwt.verify(token, SECRET, {}, async (err, info) => {
    if (err) throw err;
    const postInputs = PostInputs.safeParse(req.body);
    if (!postInputs.success) {
      return res.status(411).json({ message: postInputs.error });
    }
    const title = postInputs.data.title;
    const summary = postInputs.data.summary;
    const content = postInputs.data.content;
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
      const postInputs = PostInputs.safeParse(req.body);
      if (!postInputs.success) {
        return res.status(411).json({ message: postInputs.error });
      }
      const title = postInputs.data.title;
      const summary = postInputs.data.summary;
      const content = postInputs.data.content;
      const id = postInputs.data.id;
      const postDoc = await Post.findById(id);
      if (!postDoc?.cover) return res.status(403);
      const isAuthor =
        JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(401).json("wrong author");
      }
      if (newPath) {
        const imageLink = path.join(__dirname, "..", postDoc.cover);
        fs.unlink(imageLink, (err) => {
          if (err) console.log(err);
        });
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
    const postDoc = await Post.findById(id);
    if (!postDoc?.cover) {
      return res.status(404).json({ error: "Post not found" });
    }
    const imageLink = path.join(__dirname, "..", postDoc.cover);
    fs.unlink(imageLink, (err) => {
      if (err) console.log(err);
    });

    await Post.deleteOne({ _id: id });
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
