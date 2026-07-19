import { TEMPLATE_REGISTRY } from "./templateRegistry";
import { WorkspaceTemplate } from "./templateTypes";

export function getTemplates(): WorkspaceTemplate[] {
  return Object.values(TEMPLATE_REGISTRY);
}

export function getTemplateById(
  templateId: string
): WorkspaceTemplate | null {
  return TEMPLATE_REGISTRY[templateId] ?? null;
}