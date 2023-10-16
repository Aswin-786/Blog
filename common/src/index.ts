import { z } from "zod";

export const userInputs = z.object({
  username: z.string().min(1).max(25),
  password: z.string().min(6).max(20),
});

export type userInputParams = z.infer<typeof userInputs>;

export const PostInputs = z.object({
  id: z.string().min(1).max(100),
  title: z.string().min(1).max(500),
  summary: z.string().min(1),
  content: z.string(),
});

export type postInputParams = z.infer<typeof PostInputs>;
