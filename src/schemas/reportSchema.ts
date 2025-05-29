import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  context: z.record(z.unknown()).optional(),
});

export type IssueRequest = z.infer<typeof issueSchema>;
