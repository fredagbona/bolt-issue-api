import { Octokit } from '@octokit/rest';
import { GitHubService } from '../../src/services/githubService';

jest.mock('@octokit/rest');

describe('GitHubService', () => {
  const mockCreate = jest.fn();

  beforeAll(() => {
    ((Octokit as unknown) as jest.Mock).mockImplementation(() => ({
      issues: { create: mockCreate },
    }));
  });

  afterEach(() => {
    mockCreate.mockReset();
  });

  it('creates an issue and returns its URL', async () => {
    mockCreate.mockResolvedValue({ data: { html_url: 'https://github.com/.../issues/1' } });
    const service = new GitHubService();
    const url = await service.createIssue({
      title: 'Bug found',
      description: 'Details here',
      context: { foo: 'bar' },
    });
    expect(url).toBe('https://github.com/.../issues/1');
    expect(mockCreate).toHaveBeenCalledWith({
      owner: expect.any(String),
      repo: expect.any(String),
      title: 'Bug found',
      body: expect.stringContaining('### Description'),
    });
  });

  it('throws when GitHub API fails', async () => {
    mockCreate.mockRejectedValue(new Error('API error'));
    const service = new GitHubService();
    await expect(
      service.createIssue({ title: 'Fail', context: {} })
    ).rejects.toThrow('API error');
  });
});
