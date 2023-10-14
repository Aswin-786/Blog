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
const date_fns_1 = require("date-fns");
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const axios_1 = __importDefault(require("axios"));
const material_1 = require("@mui/material");
const recoil_1 = require("recoil");
const userDetails_1 = require("../store/selectors/userDetails");
const PostPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [postInfo, setPostInfo] = (0, react_1.useState)("");
    const userId = (0, recoil_1.useRecoilValue)(userDetails_1.userIdState);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const getPost = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get(`http://localhost:4000/post/${id}`);
                if (res.status === 200) {
                    setPostInfo(res.data);
                }
            }
            catch (error) { }
        });
        getPost();
    }, []);
    if (!postInfo)
        return "";
    const deleteItem = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.delete(`http://localhost:4000/post/${id}`, {});
        if (res.status === 200) {
            navigate("/");
        }
    });
    return (react_1.default.createElement("div", { className: "post-page" },
        react_1.default.createElement("h1", { className: "text-3xl text-center font-medium" }, postInfo.title),
        react_1.default.createElement("div", { className: " flex justify-between mx-3 my-3" },
            react_1.default.createElement(react_router_dom_1.Link, { to: `/user/${postInfo.author._id}`, className: "author" },
                "by",
                " ",
                react_1.default.createElement("span", { className: "bg-stone-200 rounded-md p-1" }, postInfo.author.username)),
            react_1.default.createElement("time", { className: " text-stone-600 font-light italic" }, (0, date_fns_1.formatISO9075)(new Date(postInfo.createdAt)))),
        userId === postInfo.author._id && (react_1.default.createElement("div", { className: " flex items-center justify-between my-10" },
            react_1.default.createElement(react_router_dom_1.Link, { to: `/edit/${postInfo._id}`, alt: "", className: "w-1/3" },
                react_1.default.createElement(material_1.Button, { variant: "outlined", color: "error", startIcon: react_1.default.createElement(Edit_1.default, null) }, "Edit")),
            react_1.default.createElement(material_1.Button, { variant: "outlined", onClick: deleteItem, color: "error", className: "w-1/3", startIcon: react_1.default.createElement(Delete_1.default, null) }, "Delete"))),
        react_1.default.createElement("div", { className: "flex items-center justify-center" },
            react_1.default.createElement("img", { className: "md:h-[500px] h-[300px]", src: "http://localhost:4000/" + postInfo.cover, alt: "" })),
        react_1.default.createElement("div", { className: "text-justify my-9", dangerouslySetInnerHTML: { __html: postInfo.content } })));
};
exports.default = PostPage;
