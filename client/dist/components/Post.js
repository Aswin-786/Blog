"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const date_fns_1 = require("date-fns");
const react_router_dom_1 = require("react-router-dom");
const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
    return (react_1.default.createElement(react_router_dom_1.Link, { to: `/post/${_id}` },
        react_1.default.createElement("div", { className: "post" },
            react_1.default.createElement("div", { className: "image" },
                react_1.default.createElement("img", { className: "rounded-l-md", src: "http://localhost:4000/" + cover, alt: "" })),
            react_1.default.createElement("div", { className: "text" },
                react_1.default.createElement("h2", null, title),
                react_1.default.createElement("div", { className: "info" },
                    react_1.default.createElement("a", { href: "", className: "author" }, author.username),
                    react_1.default.createElement("time", { className: "font-light" }, (0, date_fns_1.format)(new Date(createdAt), "MMM d, yyyy HH:mm"))),
                react_1.default.createElement("p", { className: "summary" }, summary)))));
};
exports.default = Post;
