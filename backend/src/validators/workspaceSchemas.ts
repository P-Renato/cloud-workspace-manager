import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100),

  templateId: z
    .string()
    .trim()
    .min(1),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100),
});