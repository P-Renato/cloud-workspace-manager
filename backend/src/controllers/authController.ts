import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../services/userStore";
import { generateToken, verifyToken } from "../services/authService";
import crypto from "crypto";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existing = findUserByEmail(email);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = createUser({
    id: crypto.randomUUID(),
    email,
    passwordHash,
  });

  res.json({ id: user.id, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  res.json({ token });
};

export const me = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    res.json({ userId: decoded.userId });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};