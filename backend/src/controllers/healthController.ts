import { Request, Response } from "express";

export const getHealth = (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "Cloud Workspace Manager API is running",
    version: "0.1.0",
  });
};