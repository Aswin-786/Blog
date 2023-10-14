"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_1 = __importDefault(require("./pages/Layout"));
const react_router_dom_1 = require("react-router-dom");
const IndexPages_1 = __importDefault(require("./pages/IndexPages"));
const LoginPage_1 = __importDefault(require("./pages/LoginPage"));
const RegisterPage_1 = __importDefault(require("./pages/RegisterPage"));
const react_1 = require("react");
const UserDetails_1 = __importDefault(require("./pages/UserDetails"));
const Loading_1 = __importDefault(require("./components/Loading"));
const recoil_1 = require("recoil");
const InitUser_1 = __importDefault(require("./components/InitUser"));
const react_2 = __importDefault(require("react"));
const EditPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/EditPage"))));
const CreatePost = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/CreatePost"))));
const PostPage = (0, react_1.lazy)(() => Promise.resolve().then(() => __importStar(require("./pages/PostPage"))));
function App() {
    return (react_2.default.createElement(recoil_1.RecoilRoot, null,
        react_2.default.createElement(react_1.Suspense, { fallback: react_2.default.createElement(Loading_1.default, null) },
            react_2.default.createElement(InitUser_1.default, null),
            react_2.default.createElement(react_router_dom_1.Routes, null,
                react_2.default.createElement(react_router_dom_1.Route, { path: "/", element: react_2.default.createElement(Layout_1.default, null) },
                    react_2.default.createElement(react_router_dom_1.Route, { index: true, element: react_2.default.createElement(IndexPages_1.default, null) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_2.default.createElement(LoginPage_1.default, null) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/register", element: react_2.default.createElement(RegisterPage_1.default, null) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/create", element: react_2.default.createElement(CreatePost, null) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/post/:id", element: react_2.default.createElement(PostPage, null) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/edit/:id", element: react_2.default.createElement(EditPage, null) }),
                    react_2.default.createElement(react_router_dom_1.Route, { path: "/user/:userId", element: react_2.default.createElement(UserDetails_1.default, null) }))))));
}
exports.default = App;
