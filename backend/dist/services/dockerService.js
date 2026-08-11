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
exports.removeVolume = removeVolume;
exports.getContainerStatus = getContainerStatus;
exports.getContainerStats = getContainerStats;
exports.containerExists = containerExists;
const dockerode_1 = __importDefault(require("dockerode"));
const docker = new dockerode_1.default();
function getContainer(containerId) {
    return docker.getContainer(containerId);
}
function getVolumeName(workspaceId) {
    return `workspace-${workspaceId}`;
}
async function ensureVolumeExists(workspaceId) {
    const volumeName = getVolumeName(workspaceId);
    try {
        await docker
            .getVolume(volumeName)
            .inspect();
        console.log(`Volume already exists: ${volumeName}`);
    }
    catch {
        console.log(`Creating volume: ${volumeName}`);
        await docker.createVolume({ Name: volumeName, });
        console.log(`Volume created: ${volumeName}`);
    }
    return volumeName;
}
async function createContainer(workspaceId, image) {
    console.log("Docker createContainer()");
    console.log("Workspace:", workspaceId);
    console.log("Image:", image);
    await ensureImageExists(image);
    const containerName = `workspace-${workspaceId}`;
    const volumeName = await ensureVolumeExists(workspaceId);
    console.log("Volume:", volumeName);
    const container = await docker.createContainer({
        name: containerName,
        Image: image,
        Cmd: ["sleep", "infinity"],
        HostConfig: {
            Binds: [
                `${volumeName}:/workspace`,
            ],
        },
    });
    console.log("Container created:", container.id);
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
    try {
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
    catch {
        return null;
    }
}
async function ensureImageExists(image) {
    try {
        await docker.getImage(image).inspect();
        console.log(`Image already exists: ${image}`);
        return;
    }
    catch {
        console.log(`Pulling image: ${image}`);
        const stream = await docker.pull(image);
        await new Promise((resolve, reject) => {
            docker.modem.followProgress(stream, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
        console.log(`Image downloaded: ${image}`);
    }
}
async function removeVolume(workspaceId) {
    const volumeName = getVolumeName(workspaceId);
    try {
        await docker
            .getVolume(volumeName)
            .remove();
        console.log("Volume removed:", volumeName);
    }
    catch {
        console.log("Volume not found:", volumeName);
    }
}
async function getContainerStatus(containerId) {
    try {
        const metadata = await getContainer(containerId).inspect();
        return metadata.State.Status;
    }
    catch {
        return "missing";
    }
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
async function containerExists(containerId) {
    try {
        await docker
            .getContainer(containerId)
            .inspect();
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=dockerService.js.map