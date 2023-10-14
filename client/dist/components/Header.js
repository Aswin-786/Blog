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
const axios_1 = __importDefault(require("axios"));
const recoil_1 = require("recoil");
const userDetails_1 = require("../store/selectors/userDetails");
const User_1 = require("../store/atoms/User");
const Header = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [toggle, setToggle] = (0, react_1.useState)(false);
    const userName = (0, recoil_1.useRecoilValue)(userDetails_1.userEmailState);
    const setUser = (0, recoil_1.useSetRecoilState)(User_1.userState);
    const userId = (0, recoil_1.useRecoilValue)(userDetails_1.userIdState);
    function logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.post("http://localhost:4000/logout", {
                    withCredentials: true,
                });
                if (res.status === 200) {
                    document.cookie =
                        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    setUser({
                        isLoading: false,
                        userName: null,
                    });
                    navigate("/login");
                }
            }
            catch (error) { }
        });
    }
    return (react_1.default.createElement("header", { className: "md:flex md:flex-row md:items-center md:justify-between flex flex-col items-start " },
        react_1.default.createElement(react_router_dom_1.Link, { to: "/", alt: "", className: "logo" },
            react_1.default.createElement("span", { onClick: () => setToggle(false), className: "md:w-5 md:h-5 w-3 h-3 text-white bg-black rounded-full md:px-5 md:py-2 px-3 py-0 hover:opacity-80" }, "B")),
        react_1.default.createElement("div", { className: "absolute right-4 text-3xl font-bold md:hidden transition-all delay-500 ease-in", onClick: () => setToggle(!toggle) }, toggle ? (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: "w-6 h-6" },
            react_1.default.createElement("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18L18 6M6 6l12 12" }))) : (react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-6 h-6" },
            react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" })))),
        react_1.default.createElement("nav", { onClick: () => setToggle(!toggle), className: `md:flex md:flex-row flex flex-col md:py-0 py-6 md:static overflow-hidden absolute md:bg-inherit bg-stone-700 text-white md:text-black md:z-auto z-[1] md:mt-0 mt md:w-auto w-full left-0 text-center transition-all md:duration-0 duration-500 ease-in ${toggle ? "top-20 opacity-100 " : "top-[-300px]"} md:opacity-100 opacity-0` },
            react_1.default.createElement(react_router_dom_1.Link, { className: "font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black", to: "/" }, "Home"),
            userName && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/create", className: "font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black" }, "Create new Post"),
                react_1.default.createElement("div", { className: "cursor-pointer flex flex-col gap-3 md:flex-row" },
                    react_1.default.createElement(react_router_dom_1.Link, { to: `/user/${userId}`, className: "font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black" }, userName),
                    " ",
                    react_1.default.createElement("div", { onClick: logout, className: "font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black" }, "Logout")))),
            !userName && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_router_dom_1.Link, { to: "/login", className: "font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black" }, "Login"),
                react_1.default.createElement(react_router_dom_1.Link, { to: "/register", className: "font-semibold border-b-2 border-transparent transition-all delay-100 pb-1 moveBorder hover:border-b-2 hover:border-black" }, "Register"))))));
};
exports.default = Header;
