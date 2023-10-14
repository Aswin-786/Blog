"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
exports.fs = fs_1.default;
exports.uploadMiddleware = (0, multer_1.default)({
    dest: "uploads/",
    limits: {
        fieldSize: 10 * 1024 * 1024,
    },
});
