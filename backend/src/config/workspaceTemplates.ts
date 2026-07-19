export interface WorkspaceTemplate {
  id: string;
  name: string;
  image: string;
}

export const WORKSPACE_TEMPLATES: Record<string, WorkspaceTemplate> = {
  alpine: {
    id: "alpine",
    name: "Alpine Linux",
    image: "alpine:latest",
  },

  ubuntu: {
    id: "ubuntu",
    name: "Ubuntu",
    image: "ubuntu:24.04",
  },

  node22: {
    id: "node22",
    name: "Node.js 22",
    image: "node:22-alpine",
  },

  python312: {
    id: "python312",
    name: "Python 3.12",
    image: "python:3.12-alpine",
  },
};