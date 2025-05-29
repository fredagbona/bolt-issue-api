import { z } from 'zod';

export const issueSchema = z.object({
  title: z
    .string({ required_error: 'Title is required', invalid_type_error: 'Title must be a string' })
    .nonempty('Title is required'),
  description: z.string().optional(),
  context: z.record(z.unknown()).optional(),
});

export type IssueRequest = z.infer<typeof issueSchema>;
