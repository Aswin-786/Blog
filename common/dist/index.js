"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFile = exports.fileSchema = exports.PostInputs = exports.userInputs = void 0;
const zod_1 = require("zod");
exports.userInputs = zod_1.z.object({
    username: zod_1.z.string().min(1).max(25),
    password: zod_1.z.string().min(6).max(20),
});
exports.PostInputs = zod_1.z.object({
    id: zod_1.z.string().min(1).max(100).optional(),
    title: zod_1.z.string().min(1).max(500),
    summary: zod_1.z.string().min(1),
    content: zod_1.z.string(),
});
exports.fileSchema = zod_1.z.object({
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    size: zod_1.z.number(),
});
const validateFile = (file) => {
    const fileValidation = exports.fileSchema.safeParse(file);
    if (!fileValidation.success) {
        console.error("File validation failed:", fileValidation.error);
        return false;
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
        console.error("Unsupported file type. Please choose a valid image file.");
        return false;
    }
    return true;
};
exports.validateFile = validateFile;
