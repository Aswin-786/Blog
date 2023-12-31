"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Loading = () => {
    return (react_1.default.createElement("div", { className: "h-screen w-screen flex items-center justify-center" },
        react_1.default.createElement("span", { className: "loader " })));
};
exports.default = Loading;
