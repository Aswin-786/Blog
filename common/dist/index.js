"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostInputs = exports.userInputs = void 0;
const zod_1 = require("zod");
exports.userInputs = zod_1.z.object({
    username: zod_1.z.string().min(1).max(25),
    password: zod_1.z.string().min(6).max(20),
});
exports.PostInputs = zod_1.z.object({
    id: zod_1.z.string().min(1).max(100),
    title: zod_1.z.string().min(1).max(500),
    summary: zod_1.z.string().min(1),
    content: zod_1.z.string(),
});
