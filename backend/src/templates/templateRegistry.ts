import { WorkspaceTemplate } from "./templateTypes";

export const TEMPLATE_REGISTRY: Record<string, WorkspaceTemplate> = {
  alpine: {
    id: "alpine",
    name: "Alpine Linux",
    description: "Minimal Linux container",
    image: "alpine:latest",
    defaultCommand: ["sleep", "infinity"],
    category: "Linux",
  },

  ubuntu: {
    id: "ubuntu",
    name: "Ubuntu",
    description: "Ubuntu 24.04 LTS",
    image: "ubuntu:24.04",
    defaultCommand: ["sleep", "infinity"],
    category: "Linux",
  },

  node: {
    id: "node",
    name: "Node.js",
    description: "Node.js 22 Alpine",
    image: "node:22-alpine",
    defaultCommand: ["sleep", "infinity"],
    category: "JavaScript",
  },

  python: {
    id: "python",
    name: "Python",
    description: "Python 3.12 Slim",
    image: "python:3.12-slim",
    defaultCommand: ["sleep", "infinity"],
    category: "Python",
  },
};