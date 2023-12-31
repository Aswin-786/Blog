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
const recoil_1 = require("recoil");
const User_1 = require("../store/atoms/User");
const axios_1 = __importDefault(require("axios"));
const InitUser = () => {
    const setUser = (0, recoil_1.useSetRecoilState)(User_1.userState);
    (0, react_1.useEffect)(() => {
        const checkProfile = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get("http://localhost:4000/profile", {
                    withCredentials: true,
                });
                if (res.status === 200) {
                    setUser({
                        isLoading: false,
                        userName: res.data.username,
                        userId: res.data.id,
                    });
                }
            }
            catch (error) {
                setUser({
                    isLoading: false,
                    userName: null,
                    userId: null,
                });
            }
        });
        checkProfile();
    }, []);
    return react_1.default.createElement(react_1.default.Fragment, null);
};
exports.default = InitUser;
