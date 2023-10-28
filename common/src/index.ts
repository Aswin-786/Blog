import { z } from "zod";

export const userInputs = z.object({
  username: z.string().min(1).max(25),
  password: z.string().min(6).max(20),
});

export type userInputParams = z.infer<typeof userInputs>;

export const PostInputs = z.object({
  id: z.string().min(1).max(100).optional(),
  title: z.string().min(1).max(500),
  summary: z.string().min(1),
  content: z.string(),
});

export type postInputParams = z.infer<typeof PostInputs>;

export const fileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
});

export const validateFile = (file: File) => {
  const fileValidation = fileSchema.safeParse(file);

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
