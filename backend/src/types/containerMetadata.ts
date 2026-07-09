export interface ContainerMetadata {
  id: string;
  name: string;
  image: string;
  status: string;
  ipAddress: string | null;
  createdAt: string;
}