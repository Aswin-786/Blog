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
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
const recoil_1 = require("recoil");
const userDetails_1 = require("../store/selectors/userDetails");
const UserDetails = () => {
    var _a, _b;
    const [user, setUser] = (0, react_2.useState)(null);
    const userIds = (0, recoil_1.useRecoilValue)(userDetails_1.userIdState);
    const { userId } = (0, react_router_dom_1.useParams)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get(`http://localhost:4000/user/${userId}`);
                if (res.status === 200) {
                    setUser(res.data);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        getUser();
    }, []);
    function deltePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default.delete(`http://localhost:4000/post/${id}`, {});
            if (res.status === 200) {
                navigate("/");
            }
        });
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "flex flex-col items-center justify-center mb-4 bg-gray-200 py-4 rounded-md" },
            react_1.default.createElement("svg", { className: "", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: "w-16 h-16 md:w-24 md:h-24" },
                react_1.default.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" })),
            react_1.default.createElement("h1", { key: (_a = user === null || user === void 0 ? void 0 : user.userDoc) === null || _a === void 0 ? void 0 : _a._id, className: "text-3xl bg-stone-500 text-gray-200 px-3 py-1 rounded-xl" }, (_b = user === null || user === void 0 ? void 0 : user.userDoc) === null || _b === void 0 ? void 0 : _b.username)),
        react_1.default.createElement("div", null,
            react_1.default.createElement("h2", { className: " text-center text-2xl font-bold py-2 mb-3" }, "User Post"), user === null || user === void 0 ? void 0 :
            user.postDoc.map((item) => {
                var _a;
                return (react_1.default.createElement("div", { key: item._id, className: "flex items-center justify-between bg-gray-100 my-4 rounded-md cursor-pointer hover:bg-gray-200" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(react_router_dom_1.Link, { to: `/post/${item._id}` },
                            react_1.default.createElement("div", { className: "flex items-center  gap-4" },
                                react_1.default.createElement("img", { src: "http://localhost:4000/" + item.cover, className: "w-[100px] h-[100px] rounded-l-md", alt: "" }),
                                react_1.default.createElement("p", { className: "md:text-lg text-sm font-semibold uppercase" }, item.title)))),
                    ((_a = user === null || user === void 0 ? void 0 : user.userDoc) === null || _a === void 0 ? void 0 : _a._id) === userIds && (react_1.default.createElement("div", { className: "mr-3 hover:opacity-80", onClick: () => deltePost(item._id) },
                        react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: "w-6 h-6" },
                            react_1.default.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" }))))));
            }))));
};
exports.default = UserDetails;
