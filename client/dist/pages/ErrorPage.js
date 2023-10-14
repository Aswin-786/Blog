"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ErrorPage = () => {
    return (react_1.default.createElement("div", { className: "flex flex-col items-center gap-5 justify-center mt-52" },
        react_1.default.createElement("h1", { className: "md:text-8xl text-5xl font-extrabold " }, "404"),
        react_1.default.createElement("h2", { className: "md:text-4xl text-2xl text-stone-700 font-bold" }, "Something Went Wrong")));
};
exports.default = ErrorPage;
