import express from "express";
import { userInputs } from "@aswin___786/common";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Post from "../models/Post";

const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const SECRET = "jdkshfaksjfkjads";

interface Token {
  token: string;
}

router.post("/register", async (req, res) => {
  const { userInput } = req.body;

  const inputs = userInputs.safeParse({
    username: userInput.username,
    password: userInput.password,
  });
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

router.post("/login", async (req, res) => {
  const { userInput } = req.body;

  const inputs = userInputs.safeParse({
    username: userInput.username,
    password: userInput.password,
  });
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
            // res.cookie("token", token).json({
            //   id: userDoc._id,
            //   username: inputs.data.username,
            // });
            res.json({
              id: userDoc._id,
              username: inputs.data.username,
              token,
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

// profile
router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // const { token }: Token = req.cookies;
    jwt.verify(token, SECRET, {}, (err, info) => {
      if (err) throw err;
      res.status(200).json({ info, token });
    });
  }
});

// logut
router.post("/logout", (req, res) => {
  res.json("ok done");
});

// user Profile
router.get("/:userId", async (req, res) => {
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

export default router;
