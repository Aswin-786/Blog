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
const TextField_1 = __importDefault(require("@mui/material/TextField"));
const axios_1 = __importDefault(require("axios"));
const User_1 = require("../store/atoms/User");
const recoil_1 = require("recoil");
const LoginPage = () => {
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const setUser = (0, recoil_1.useSetRecoilState)(User_1.userState);
    function login(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                const response = yield axios_1.default.post("http://localhost:4000/login", {
                    username,
                    password,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setUser({
                        isLoading: false,
                        userName: response.data.username,
                        userId: response.data.id,
                    });
                    navigate("/");
                }
                else {
                    alert("Wrong credentials");
                }
            }
            catch (error) {
                console.error("Error during login:", error);
            }
        });
    }
    return (react_1.default.createElement("form", { className: "login flex flex-col gap-4 items-center ", onSubmit: login },
        react_1.default.createElement("h1", { className: "text-center font-semibold text-2xl py-5" }, "Login"),
        react_1.default.createElement(TextField_1.default, { required: true, id: "outlined-basic", label: "UserName", color: "primary", variant: "outlined", className: "w-full focus-visible:outline-black", value: username, onChange: (e) => setUsername(e.target.value) }),
        react_1.default.createElement(TextField_1.default, { required: true, id: "outlined-password-input", label: "Password", type: "password", autoComplete: "current-password", className: "w-full", value: password, onChange: (e) => setPassword(e.target.value) }),
        react_1.default.createElement("button", null, "Login"),
        react_1.default.createElement("h3", null,
            "Don't you have account?",
            " ",
            react_1.default.createElement(react_router_dom_1.Link, { to: "/register", className: "text-stone-600 underline" }, "Register"))));
};
exports.default = LoginPage;
