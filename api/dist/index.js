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
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("./models/User"));
const Post_1 = __importDefault(require("./models/Post"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fileUpload_1 = require("./middleware/fileUpload");
const fileUpload_2 = require("./middleware/fileUpload");
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static(__dirname + "/uploads"));
const salt = bcryptjs_1.default.genSaltSync(10);
const SECRET = "jdkshfaksjfkjads";
const mongoUrl = process.env.MONGO;
if (!mongoUrl) {
    console.error("wron mongo url");
    process.exit(1);
}
mongoose_1.default.connect(mongoUrl);
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    try {
        const userDoc = yield User_1.default.create({
            username: inputs.username,
            password: bcryptjs_1.default.hashSync(inputs.password, salt),
        });
        res.status(201).json(userDoc);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inputs = req.body;
    try {
        const userDoc = yield User_1.default.findOne({ username: inputs.username });
        if (userDoc) {
            const passOk = bcryptjs_1.default.compareSync(inputs.password, userDoc.password);
            if (passOk) {
                jsonwebtoken_1.default.sign({ username: inputs.username, id: userDoc._id }, SECRET, {}, (err, token) => {
                    if (err)
                        throw err;
                    res.cookie("token", token).json({
                        id: userDoc._id,
                        username: inputs.username,
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
    if (!originalname)
        return res.status(401).json({ message: "file missing" });
    if (!path)
        return res.status(401).json({ message: "file missing" });
    const ext = originalname.split(".")[1];
    const newPath = path + "." + ext;
    fileUpload_2.fs.renameSync(path, newPath);
    const { token } = req.cookies;
    jsonwebtoken_1.default.verify(token, SECRET, {}, (err, info) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        const { title, summary, content } = req.body;
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
        }
        const { token } = req.cookies;
        jsonwebtoken_1.default.verify(token, SECRET, {}, (err, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            if (!info)
                return res.status(403).json({ message: "error occurs in info" });
            if (typeof info === "string")
                return res.status(403).json({ message: "error occurs in info" });
            const { id, title, summary, content } = req.body;
            const postDoc = yield Post_1.default.findById(id);
            if (!postDoc)
                return res.status(403);
            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
            if (!isAuthor) {
                return res.status(401).json("wrong author");
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
        const postDoc = yield Post_1.default.deleteOne({ _id: id });
        if (!postDoc) {
            return res.status(404).json({ error: "Post not found" });
        }
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
