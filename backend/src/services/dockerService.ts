import Docker from "dockerode";
import { ContainerMetadata } from "../types/containerMetadata";
import { ContainerStats } from "../types/containerStats";

const docker = new Docker();

function getContainer(containerId: string) {
  return docker.getContainer(containerId);
}

export async function createContainer(
  workspaceId: string,
  image: string
): Promise<string> {
  const containerName = `workspace-${workspaceId}`;

  const container = await docker.createContainer({
    name: containerName,
    Image: image,
    Cmd: ["sleep", "infinity"],
  });

  return container.id;
}

export async function startContainer(
  containerId: string
): Promise<void> {
  await getContainer(containerId).start();
}

export async function stopContainer(
  containerId: string
): Promise<void> {
  await getContainer(containerId).stop();
}

export async function removeContainer(
  containerId: string
): Promise<void> {
  await getContainer(containerId).remove({
    force: true,
  });
}

export async function getContainerMetadata(
  containerId: string
): Promise<ContainerMetadata> {
  const metadata = await getContainer(containerId).inspect();

  const firstNetwork = Object.values(
    metadata.NetworkSettings.Networks ?? {}
  )[0];

  const ipAddress = firstNetwork?.IPAddress ?? null;

  return {
    id: metadata.Id,
    name: metadata.Name.replace("/", ""),
    image: metadata.Config.Image,
    status: metadata.State.Status,
    ipAddress,
    createdAt: metadata.Created,
  };
}

export async function getContainerStatus(
  containerId: string
): Promise<string> {
  const metadata = await getContainer(containerId).inspect();

  return metadata.State.Status;
}

export async function getContainerStats(
  containerId: string
): Promise<ContainerStats> {

  const container = getContainer(containerId);

  const stats = await container.stats({
    stream: false,
  });

  const cpuDelta =
    stats.cpu_stats.cpu_usage.total_usage -
    stats.precpu_stats.cpu_usage.total_usage;

  const systemDelta =
    stats.cpu_stats.system_cpu_usage -
    stats.precpu_stats.system_cpu_usage;

  const cpuCount =
    stats.cpu_stats.online_cpus || 1;

  const cpuPercent =
    systemDelta > 0
      ? (cpuDelta / systemDelta) * cpuCount * 100
      : 0;

  const memoryUsage =
    stats.memory_stats.usage ?? 0;

  const memoryLimit =
    stats.memory_stats.limit ?? 0;

  const memoryPercent =
    memoryLimit > 0
      ? (memoryUsage / memoryLimit) * 100
      : 0;

  let networkRx = 0;
  let networkTx = 0;

  for (const network of Object.values(stats.networks ?? {})) {
    networkRx += network.rx_bytes;
    networkTx += network.tx_bytes;
  }

  const inspect = await container.inspect();

  return {
    cpuPercent,

    memoryUsage,
    memoryLimit,
    memoryPercent,

    networkRx,
    networkTx,

    uptime: inspect.State.StartedAt,
  };
}

