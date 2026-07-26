"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContainer = createContainer;
exports.startContainer = startContainer;
exports.stopContainer = stopContainer;
exports.removeContainer = removeContainer;
exports.getContainerMetadata = getContainerMetadata;
exports.getContainerStatus = getContainerStatus;
exports.getContainerStats = getContainerStats;
const dockerode_1 = __importDefault(require("dockerode"));
const docker = new dockerode_1.default();
function getContainer(containerId) {
    return docker.getContainer(containerId);
}
async function createContainer(workspaceId, image) {
    const containerName = `workspace-${workspaceId}`;
    const container = await docker.createContainer({
        name: containerName,
        Image: image,
        Cmd: ["sleep", "infinity"],
    });
    return container.id;
}
async function startContainer(containerId) {
    await getContainer(containerId).start();
}
async function stopContainer(containerId) {
    await getContainer(containerId).stop();
}
async function removeContainer(containerId) {
    await getContainer(containerId).remove({
        force: true,
    });
}
async function getContainerMetadata(containerId) {
    const metadata = await getContainer(containerId).inspect();
    const firstNetwork = Object.values(metadata.NetworkSettings.Networks ?? {})[0];
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
async function getContainerStatus(containerId) {
    const metadata = await getContainer(containerId).inspect();
    return metadata.State.Status;
}
async function getContainerStats(containerId) {
    const container = getContainer(containerId);
    const stats = await container.stats({
        stream: false,
    });
    const cpuDelta = stats.cpu_stats.cpu_usage.total_usage -
        stats.precpu_stats.cpu_usage.total_usage;
    const systemDelta = stats.cpu_stats.system_cpu_usage -
        stats.precpu_stats.system_cpu_usage;
    const cpuCount = stats.cpu_stats.online_cpus || 1;
    const cpuPercent = systemDelta > 0
        ? (cpuDelta / systemDelta) * cpuCount * 100
        : 0;
    const memoryUsage = stats.memory_stats.usage ?? 0;
    const memoryLimit = stats.memory_stats.limit ?? 0;
    const memoryPercent = memoryLimit > 0
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
//# sourceMappingURL=dockerService.js.map