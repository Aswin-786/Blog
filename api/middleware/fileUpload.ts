import multer from "multer";
import fs from "fs";

export const uploadMiddleware = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});

export { fs };
