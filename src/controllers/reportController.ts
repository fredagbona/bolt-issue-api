import { Request, Response, NextFunction } from 'express';
import { GitHubService, IssuePayload } from '../services/githubService';
import { IssueRequest } from '../schemas/reportSchema';

export const createIssue = async (
  req: Request<Record<string, never>, unknown, IssueRequest>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, context } = req.body;
    const service = new GitHubService();
    const issueUrl = await service.createIssue({
      title,
      description,
      context,
    } as IssuePayload);
    res.status(201).json({ issueUrl });
  } catch (err) {
    next(err);
  }
};
