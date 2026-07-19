export type WorkspaceStatus =
    | "creating"
    | "starting"
    | "running"
    | "stopping"
    | "stopped"
    | "error";

export interface Workspace {
  id: string;

  user_id: string;

  name: string;

  template_id: string;

  image: string;

  status: WorkspaceStatus;

  container_id: string | null;

  created_at: Date;

  updated_at: Date;
}