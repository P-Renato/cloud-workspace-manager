export type ActivityAction =
  | "CREATE_WORKSPACE"
  | "DELETE_WORKSPACE"
  | "START_WORKSPACE"
  | "STOP_WORKSPACE";

export interface ActivityLog {
  id: string;
  workspace_id: string;
  action: ActivityAction;
  created_at: Date;
}