"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const app = (0, express_1.default)();
const uploadsDirectory = path_1.default.join(__dirname, "../uploads");
app.use(express_1.default.json());
// app.use(
//   cors({
//     credentials: true,
//     origin: "*",
//   })
// );
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:3000",
}));
app.use((0, cookie_parser_1.default)());
app.use("/user", user_1.default);
app.use("/post", post_1.default);
app.use("/uploads", express_1.default.static(uploadsDirectory));
const mongoUrl = process.env.MONGO;
if (!mongoUrl) {
    console.error("wrong mongo url");
    process.exit(1);
}
mongoose_1.default.connect(mongoUrl);
app.get("/", (req, res) => {
    res.status(200).json({ message: "test test 10" });
});
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
