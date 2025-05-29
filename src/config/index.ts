import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

// Define schema for environment variables
const envSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, { message: 'PORT must be a number string' })
    .transform((val) => parseInt(val, 10)),
  GITHUB_TOKEN: z.string().min(1, 'GITHUB_TOKEN is required'),
  GITHUB_REPO_OWNER: z.string().min(1, 'GITHUB_REPO_OWNER is required'),
  GITHUB_REPO_NAME: z.string().min(1, 'GITHUB_REPO_NAME is required'),
});

// Parse and validate
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const config = {
  port: _env.data.PORT,
  githubToken: _env.data.GITHUB_TOKEN,
  githubOwner: _env.data.GITHUB_REPO_OWNER,
  githubRepo: _env.data.GITHUB_REPO_NAME,
};
