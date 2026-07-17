import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Workspace name is required")
    .max(100, "Workspace name must be at most 100 characters"),

  templateId: z
    .string()
    .min(1, "Template is required"),

  image: z
    .string()
    .min(1, "Docker image is required"),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Workspace name is required")
    .max(100, "Workspace name must be at most 100 characters"),
});