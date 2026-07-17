import { exec } from "child_process";
import { promisify } from "util";
import { ContainerMetadata } from "../types/containerMetadata";

const execAsync = promisify(exec);

export async function createContainer(
  workspaceId: string,
  image: string
): Promise<string> {
  const containerName =
    `workspace-${workspaceId}`;

  const { stdout } = await execAsync(
    `docker create --name ${containerName} ${image} sleep infinity`
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

export async function getContainerMetadata(
  containerId: string
): Promise<ContainerMetadata> {
  const { stdout } = await execAsync(
    `docker inspect ${containerId}`
  );

  const container =
    JSON.parse(stdout)[0];

  return {
    id: container.Id,
    name: container.Name.replace(
      "/",
      ""
    ),
    image: container.Config.Image,
    status: container.State.Status,
    ipAddress:
      container.NetworkSettings
        .IPAddress || null,
    createdAt:
      container.Created,
  };
}