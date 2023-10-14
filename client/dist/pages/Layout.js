"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("../components/Header"));
const react_router_dom_1 = require("react-router-dom");
const Layout = () => {
    return (react_1.default.createElement("main", { className: "min-h-screen" },
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement(react_router_dom_1.Outlet, null)));
};
exports.default = Layout;
