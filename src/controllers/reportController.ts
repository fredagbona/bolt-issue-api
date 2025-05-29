import { Request, Response, NextFunction } from 'express';
import { GitHubService } from '../services/githubService';

const github = new GitHubService();

export const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, context } = req.body;
    const issueUrl = await github.createIssue({ title, description, context });
    res.status(201).json({ issueUrl });
  } catch (err) {
    next(err);
  }
};
