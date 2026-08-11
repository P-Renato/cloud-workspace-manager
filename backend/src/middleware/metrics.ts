import { Request, Response, NextFunction } from "express";
import {httpRequestCounter, httpRequestDuration, } from "../config/prometheus";

export function metricsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const duration = Number(process.hrtime.bigint() - start) / 1_000_000_000;

    const route = req.route?.path
      ? `${req.baseUrl}${req.route.path}`
      : req.path;

    const labels = {
      method: req.method,
      route,
      status_code: res.statusCode.toString(),
    };

    httpRequestCounter.inc(labels);

    httpRequestDuration.observe(labels, duration);
  });

  next();
}