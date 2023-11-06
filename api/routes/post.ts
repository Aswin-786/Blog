import expres from "express";
import { uploadMiddleware, fs } from "../middleware/fileUpload";
import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { PostInputs } from "@aswin___786/common";
import Post from "../models/Post";

const router = expres.Router();
const supabaseUrl = "https://zepjyypndjdibhvsxifk.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
  console.error("wrong supabase url");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

interface Token {
  token: string;
}
const SECRET = "jdkshfaksjfkjads";

router.post("/", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file || {};
  if (!originalname || !path)
    return res.status(401).json({ message: "file missing" });
  const ext = originalname.split(".")[1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  try {
    const { data, error } = await supabase.storage
      .from("share")
      .upload(newPath, fs.createReadStream(newPath), {
        duplex: "half",
      });

    if (error) {
      return res.status(500).json({ message: "File upload failed.", error });
    }

    // Remove the temporary file server
    fs.unlinkSync(newPath);
  } catch (error) {
    console.error("Supabase upload error:", error);
    return res.status(500).json({ message: "File upload failed.", error });
  }

  // const { token }: Token = req.cookies;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, {}, async (err, info) => {
      if (err) throw err;
      const postInputs = PostInputs.safeParse(req.body);
      if (!postInputs.success) {
        return res.status(411).json({ message: postInputs.error });
      }
      const title = postInputs.data.title;
      const summary = postInputs.data.summary;
      const content = postInputs.data.content;
      if (!info)
        return res.status(401).json({ message: "error occurs in info" });
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
  }
});

router.get("/", async (req, res) => {
  const data = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(data);
});

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.status(200).json(postDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put(`/`, uploadMiddleware.single("file"), async (req, res) => {
  try {
    let newPath: fs.PathLike | null = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split(".")[1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);

      try {
        const { data, error } = await supabase.storage
          .from("share")
          .upload(newPath, fs.createReadStream(newPath), {
            duplex: "half",
          });

        if (error) {
          return res
            .status(500)
            .json({ message: "File upload failed.", error });
        }

        // Remove the temporary file from server
        fs.unlinkSync(newPath);
      } catch (error) {
        console.error("Supabase upload error:", error);
        return res.status(500).json({ message: "File upload failed.", error });
      }
    }
    // const { token }: Token = req.cookies;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
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
          const coverPath = postDoc.cover;
          const imageName: string | undefined = coverPath
            ? coverPath.split("\\").pop()
            : undefined;

          if (imageName === undefined) {
            return res.status(500).json({ error: "Image name is undefined" });
          }

          const { data, error } = await supabase.storage
            .from("share")
            .remove([`uploads/${imageName}`]);

          if (error) {
            return res
              .status(500)
              .json({
                error: "Supabase image deletion failed",
                details: error,
              });
          }
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
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id);
    if (!postDoc?.cover) {
      return res.status(404).json({ error: "Post not found" });
    }
    const coverPath = postDoc.cover;
    const imageName: string | undefined = coverPath
      ? coverPath.split("\\").pop()
      : undefined;

    if (imageName === undefined) {
      return res.status(500).json({ error: "Image name is undefined" });
    }

    const { data, error } = await supabase.storage
      .from("share")
      .remove([`uploads/${imageName}`]);

    if (error) {
      return res
        .status(500)
        .json({ error: "Supabase image deletion failed", details: error });
    }

    await Post.deleteOne({ _id: id });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
