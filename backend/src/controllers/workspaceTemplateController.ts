import { Request, Response } from "express";
import { WORKSPACE_TEMPLATES } from "../config/workspaceTemplates";

export function getTemplates(
  req: Request,
  res: Response
) {
  return res.json(Object.values(WORKSPACE_TEMPLATES).map(template => ({
    id: template.id,
    name: template.name,
  })));
}