import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function createContainer(
  workspaceId: string
): Promise<string> {
  const containerName =
    `workspace-${workspaceId}`;

  const { stdout } = await execAsync(
    `docker create --name ${containerName} alpine:latest sleep infinity`
  );

  return stdout.trim();
}

export async function startContainer(
  containerId: string
): Promise<void> {
  await execAsync(
    `docker start ${containerId}`
  );
}

export async function stopContainer(
  containerId: string
): Promise<void> {
  await execAsync(
    `docker stop ${containerId}`
  );
}

export async function removeContainer(
  containerId: string
): Promise<void> {
  await execAsync(
    `docker rm -f ${containerId}`
  );
}