"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContainer = createContainer;
exports.startContainer = startContainer;
exports.stopContainer = stopContainer;
exports.removeContainer = removeContainer;
exports.getContainerMetadata = getContainerMetadata;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function createContainer(workspaceId) {
    const containerName = `workspace-${workspaceId}`;
    const { stdout } = await execAsync(`docker create --name ${containerName} alpine:latest sleep infinity`);
    return stdout.trim();
}
async function startContainer(containerId) {
    await execAsync(`docker start ${containerId}`);
}
async function stopContainer(containerId) {
    await execAsync(`docker stop ${containerId}`);
}
async function removeContainer(containerId) {
    await execAsync(`docker rm -f ${containerId}`);
}
async function getContainerMetadata(containerId) {
    const { stdout } = await execAsync(`docker inspect ${containerId}`);
    const container = JSON.parse(stdout)[0];
    return {
        id: container.Id,
        name: container.Name.replace("/", ""),
        image: container.Config.Image,
        status: container.State.Status,
        ipAddress: container.NetworkSettings
            .IPAddress || null,
        createdAt: container.Created,
    };
}
//# sourceMappingURL=dockerService.js.map