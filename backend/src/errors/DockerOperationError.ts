import { AppError } from "./AppError";

export class DockerOperationError extends AppError {
  constructor(
    message = "Docker operation failed"
  ) {
    super(message, 500);
  }
}