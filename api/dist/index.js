"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("./models/User"));
const Post_1 = __importDefault(require("./models/Post"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fileUpload_1 = require("./middleware/fileUpload");
const fileUpload_2 = require("./middleware/fileUpload");
const common_1 = require("@aswin___786/common");
const supabase_js_1 = require("@supabase/supabase-js");
// import { OAuth2Client } from "google-auth-library";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
app.use((0, cookie_parser_1.default)());
const uploadsDirectory = path_1.default.join(__dirname, "../uploads");
app.use("/uploads", express_1.default.static(uploadsDirectory));
const salt = bcryptjs_1.default.genSaltSync(10);
const SECRET = "jdkshfaksjfkjads";
const mongoUrl = process.env.MONGO;
if (!mongoUrl) {
    console.error("wrong mongo url");
    process.exit(1);
}
mongoose_1.default.connect(mongoUrl);
const supabaseUrl = "https://zepjyypndjdibhvsxifk.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
    console.error("wrong supabase url");
    process.exit(1);
}
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userInput } = req.body;
    const inputs = common_1.userInputs.safeParse({
        username: userInput.username,
        password: userInput.password,
    });
    if (!inputs.success) {
        return res.status(411).json({ message: inputs.error });
    }
    try {
        const userDoc = yield User_1.default.create({
            username: inputs.data.username,
            password: bcryptjs_1.default.hashSync(inputs.data.password, salt),
        });
        res.status(201).json(userDoc);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userInput } = req.body;
    const inputs = common_1.userInputs.safeParse({
        username: userInput.username,
        password: userInput.password,
    });
    if (!inputs.success) {
        return res.status(411).json({ message: inputs.error });
    }
    try {
        const userDoc = yield User_1.default.findOne({ username: inputs.data.username });
        if (userDoc) {
            const passOk = bcryptjs_1.default.compareSync(inputs.data.password, userDoc.password);
            if (passOk) {
                jsonwebtoken_1.default.sign({ username: inputs.data.username, id: userDoc._id }, SECRET, {}, (err, token) => {
                    if (err)
                        throw err;
                    res.cookie("token", token).json({
                        id: userDoc._id,
                        username: inputs.data.username,
                    });
                });
            }
            else {
                res.status(401).json({ message: "wrong credentials" });
            }
        }
        else {
            res.status(401).json({ message: "wrong user name" });
        }
    }
    catch (error) {
        res.status(401).json(error);
    }
}));
app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jsonwebtoken_1.default.verify(token, SECRET, {}, (err, info) => {
        if (err)
            throw err;
        res.status(200).json(info);
    });
});
app.post("/logout", (req, res) => {
    res.cookie("token", " ").json("ok");
});
app.post("/post", fileUpload_1.uploadMiddleware.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { originalname, path } = req.file || {};
    if (!originalname || !path)
        return res.status(401).json({ message: "file missing" });
    const ext = originalname.split(".")[1];
    const newPath = path + "." + ext;
    fileUpload_2.fs.renameSync(path, newPath);
    try {
        const { data, error } = yield supabase.storage
            .from("share") // Replace 'uploads' with your bucket name
            .upload(newPath, fileUpload_2.fs.createReadStream(newPath), {
            duplex: "half",
        });
        if (error) {
            return res.status(500).json({ message: "File upload failed.", error });
        }
        // Remove the temporary file from your server
        fileUpload_2.fs.unlinkSync(newPath);
    }
    catch (error) {
        console.error("Supabase upload error:", error);
        return res.status(500).json({ message: "File upload failed.", error });
    }
    const { token } = req.cookies;
    jsonwebtoken_1.default.verify(token, SECRET, {}, (err, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        const postInputs = common_1.PostInputs.safeParse(req.body);
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
        const postDoc = yield Post_1.default.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.status(201).json(postDoc);
    }));
}));
app.get("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Post_1.default.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20);
    res.json(data);
}));
app.get(`/post/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postDoc = yield Post_1.default.findById(id).populate("author", ["username"]);
        res.status(200).json(postDoc);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
app.put(`/post`, fileUpload_1.uploadMiddleware.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newPath = null;
        if (req.file) {
            const { originalname, path } = req.file;
            const ext = originalname.split(".")[1];
            newPath = path + "." + ext;
            fileUpload_2.fs.renameSync(path, newPath);
            try {
                const { data, error } = yield supabase.storage
                    .from("share") // Replace 'uploads' with your bucket name
                    .upload(newPath, fileUpload_2.fs.createReadStream(newPath), {
                    duplex: "half",
                });
                if (error) {
                    return res
                        .status(500)
                        .json({ message: "File upload failed.", error });
                }
                // Remove the temporary file from your server
                fileUpload_2.fs.unlinkSync(newPath);
            }
            catch (error) {
                console.error("Supabase upload error:", error);
                return res.status(500).json({ message: "File upload failed.", error });
            }
        }
        const { token } = req.cookies;
        jsonwebtoken_1.default.verify(token, SECRET, {}, (err, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            if (!info)
                return res.status(403).json({ message: "error occurs in info" });
            if (typeof info === "string")
                return res.status(403).json({ message: "error occurs in info" });
            const postInputs = common_1.PostInputs.safeParse(req.body);
            if (!postInputs.success) {
                return res.status(411).json({ message: postInputs.error });
            }
            const title = postInputs.data.title;
            const summary = postInputs.data.summary;
            const content = postInputs.data.content;
            const id = postInputs.data.id;
            const postDoc = yield Post_1.default.findById(id);
            if (!(postDoc === null || postDoc === void 0 ? void 0 : postDoc.cover))
                return res.status(403);
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(401).json("wrong author");
            }
            if (newPath) {
                // const imageLink = path.join(__dirname, "..", postDoc.cover);
                // fs.unlink(imageLink, (err) => {
                //   if (err) console.log(err);
                // });
                const coverPath = postDoc.cover;
                const imageName = coverPath
                    ? coverPath.split("\\").pop()
                    : undefined;
                if (imageName === undefined) {
                    return res.status(500).json({ error: "Image name is undefined" });
                }
                const { data, error } = yield supabase.storage
                    .from("share") // Specify the 'uploads' folder within the 'share' bucket
                    .remove([`uploads/${imageName}`]);
                if (error) {
                    return res
                        .status(500)
                        .json({ error: "Supabase image deletion failed", details: error });
                }
            }
            const updatedCover = newPath ? newPath : postDoc.cover;
            yield Post_1.default.updateOne({ _id: id, author: info.id }, {
                $set: {
                    title,
                    summary,
                    content,
                    cover: updatedCover,
                },
            });
            res.json(postDoc);
        }));
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
app.delete(`/post/:id`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const postDoc = yield Post_1.default.findById(id);
        if (!(postDoc === null || postDoc === void 0 ? void 0 : postDoc.cover)) {
            return res.status(404).json({ error: "Post not found" });
        }
        const coverPath = postDoc.cover;
        const imageName = coverPath
            ? coverPath.split("\\").pop()
            : undefined;
        if (imageName === undefined) {
            return res.status(500).json({ error: "Image name is undefined" });
        }
        const { data, error } = yield supabase.storage
            .from("share") // Specify the 'uploads' folder within the 'share' bucket
            .remove([`uploads/${imageName}`]);
        if (error) {
            return res
                .status(500)
                .json({ error: "Supabase image deletion failed", details: error });
        }
        yield Post_1.default.deleteOne({ _id: id });
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.get("/user/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const userDoc = yield User_1.default.findById(userId).select("username");
        if (userDoc) {
            const postDoc = yield Post_1.default.find({ author: userId }).sort({
                createdAt: -1,
            });
            res.status(200).json({ userDoc, postDoc });
        }
        else {
            res.status(404).json({ message: "user is not there" });
        }
    }
    catch (error) {
        res.status(500).json("Internal error");
    }
}));
app.listen(4000);
