import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, findByEmail } from "../repositories/userRepository";
import { generateToken, verifyToken } from "../services/authService";
import crypto from "crypto";
import { AuthRequest } from "../middleware/authenticate";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existing = await findByEmail(email);

  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const id = crypto.randomUUID();

  await createUser(id, email, passwordHash);

  res.json({
    id,
    email,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user.password_hash);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user.id);

  res.json({ token });
};

export const me = (req: AuthRequest, res: Response) => {
  res.json({
    userId: req.userId,
  });
};