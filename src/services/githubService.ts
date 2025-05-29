import { Octokit } from '@octokit/rest';
import { config } from '../config';

export interface IssuePayload {
  title: string;
  description?: string;
  context?: Record<string, unknown>;
}

export class GitHubService {
  private client: Octokit;

  constructor() {
    this.client = new Octokit({ auth: config.githubToken });
  }

  public async createIssue({
    title,
    description = '',
    context = {},
  }: IssuePayload): Promise<string> {
    const body = [
      `### Description`,
      description || 'No description provided.',
      '',
      `### Context`,
      '```json',
      JSON.stringify(context, null, 2),
      '```',
    ].join('\n');

    const issue = await this.client.issues.create({
      owner: config.githubOwner,
      repo: config.githubRepo,
      title,
      body,
    });

    return issue.data.html_url;
  }
}
