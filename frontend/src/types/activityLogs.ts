export type ActivityAction =
  | "CREATE_WORKSPACE"
  | "DELETE_WORKSPACE"
  | "START_WORKSPACE"
  | "STOP_WORKSPACE";

export interface ActivityLog {
  id: string;
  workspace_id: string;
  action: ActivityAction;
  created_at: string;
}

export interface ContainerMetadata {
  id: string;
  image: string;
  created: string;
  state: string;
  startedAt: string;
}