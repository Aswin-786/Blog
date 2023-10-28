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
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    summary: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    summary: string;
    content: string;
    id?: string | undefined;
}, {
    title: string;
    summary: string;
    content: string;
    id?: string | undefined;
}>;
export type postInputParams = z.infer<typeof PostInputs>;
export declare const fileSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodString;
    size: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: string;
    name: string;
    size: number;
}, {
    type: string;
    name: string;
    size: number;
}>;
export declare const validateFile: (file: File) => boolean;
