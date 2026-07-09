export type WorkspaceStatus =
  | "stopped"
  | "running"
  | "error";

export interface Workspace {
  id: string;
  user_id: string;
  name: string;
  status: WorkspaceStatus;
  container_id: string | null;
  created_at: string;
  updated_at: string;
}