import {
  Request,
  Response,
  NextFunction,
} from "express";

import { verifyToken } from "../services/authService";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export interface AuthRequest<
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, unknown>,
> extends Request<
    P,
    ResBody,
    ReqBody,
    ReqQuery
  > {
  userId?: string;
}

export function authenticate(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return next(
      new UnauthorizedError(
        "No token provided"
      )
    );
  }

  const token =
    authHeader.split(" ")[1];

  try {
    const decoded =
      verifyToken(token);

    req.userId =
      decoded.userId;

    next();
  } catch {
    return next(
      new UnauthorizedError(
        "Invalid token"
      )
    );
  }
}