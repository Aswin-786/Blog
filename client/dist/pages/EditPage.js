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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Editor_1 = __importDefault(require("../components/Editor"));
const axios_1 = __importDefault(require("axios"));
const EditPage = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [title, setTitle] = (0, react_1.useState)("");
    const [summary, setSummary] = (0, react_1.useState)("");
    const [content, setContent] = (0, react_1.useState)("");
    const [files, setFiles] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const editPost = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get(`http://localhost:4000/post/${id}`);
                if (res.status === 200) {
                    setTitle(res.data.title);
                    setContent(res.data.content);
                    setSummary(res.data.summary);
                }
            }
            catch (error) { }
        });
        editPost();
    }, []);
    function updatePost(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const data = new FormData();
            data.set("title", title);
            data.set("summary", summary);
            data.set("content", content);
            data.set("id", id);
            if (files === null || files === void 0 ? void 0 : files[0]) {
                data.set("file", files === null || files === void 0 ? void 0 : files[0]);
            }
            const response = yield axios_1.default.put(`http://localhost:4000/post`, data, {
                withCredentials: true,
            });
            if (response.status === 200) {
                navigate(`/post/${id}`);
            }
        });
    }
    return (react_1.default.createElement("form", { onSubmit: updatePost },
        react_1.default.createElement("input", { type: "title", placeholder: "Title", value: title, onChange: (e) => setTitle(e.target.value) }),
        react_1.default.createElement("input", { type: "summary", placeholder: "Summary", value: summary, onChange: (e) => setSummary(e.target.value) }),
        react_1.default.createElement("input", { type: "file", onChange: (e) => setFiles(e.target.files) }),
        react_1.default.createElement(Editor_1.default, { onChange: setContent, value: content }),
        react_1.default.createElement("button", { className: "mt-2" }, " Update Post")));
};
exports.default = EditPage;
