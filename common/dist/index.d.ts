import { z } from "zod";
export declare const userInputs: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type userInputParams = z.infer<typeof userInputs>;
export declare const PostInputs: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    summary: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    summary: string;
    content: string;
}, {
    id: string;
    title: string;
    summary: string;
    content: string;
}>;
export type postInputParams = z.infer<typeof PostInputs>;
