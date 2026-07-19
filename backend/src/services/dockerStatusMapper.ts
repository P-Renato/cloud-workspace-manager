import { WorkspaceStatus } from "../types/workspace";

export function mapDockerStatus(
  dockerStatus: string
): WorkspaceStatus {
  switch (dockerStatus) {
    case "running":
      return "running";

    case "created":
    case "exited":
      return "stopped";

    case "restarting":
      return "starting";

    case "paused":
      return "running";

    default:
      return "error";
  }
}