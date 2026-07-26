export interface ContainerStats {
  cpuPercent: number;

  memoryUsage: number;
  memoryLimit: number;
  memoryPercent: number;

  networkRx: number;
  networkTx: number;

  uptime: string;
}