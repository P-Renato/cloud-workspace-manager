console.log("A");

import { UnauthorizedError } from "../errors/UnauthorizedError";
console.log("B");

import { AuthRequest } from "../middleware/authenticate";
console.log("C");

import { ForbiddenError } from "../errors/ForbiddenError";
console.log("D");

import { NotFoundError } from "../errors/NotFoundError";
console.log("E");

export const test = () => {};