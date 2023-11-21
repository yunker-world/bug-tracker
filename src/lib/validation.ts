import { z } from "zod";

export const bugSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required.").max(255),
});

export const patchBugSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(255)
    .optional(),
  userId: z
    .string()
    .min(1, "userId is required")
    .max(255)
    .optional()
    .nullable(),
});
