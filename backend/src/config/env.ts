import dotenv from "dotenv";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: requireEnv("JWT_SECRET"),
  NODE_ENV: process.env.NODE_ENV || "development",
};