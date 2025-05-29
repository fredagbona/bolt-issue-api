import request from 'supertest';
import { app } from '../../src/server';
import { GitHubService } from '../../src/services/githubService';

jest.mock('../../src/services/githubService');

describe('POST /api/report', () => {
  const mockCreateIssue = jest.fn();
  beforeAll(() => {
    (GitHubService as jest.Mock).mockImplementation(() => ({
      createIssue: mockCreateIssue,
    }));
  });
  afterEach(() => {
    mockCreateIssue.mockReset();
  });

  it('returns 201 and issueUrl for valid payload', async () => {
    mockCreateIssue.mockResolvedValue('https://github.com/.../issues/42');
    const res = await request(app)
      .post('/api/report')
      .send({ title: 'Test', description: 'desc', context: { a: 1 } });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ issueUrl: 'https://github.com/.../issues/42' });
    expect(mockCreateIssue).toHaveBeenCalledWith({
      title: 'Test',
      description: 'desc',
      context: { a: 1 },
    });
  });

  it('returns 400 on missing title', async () => {
    const res = await request(app).post('/api/report').send({ description: 'oops' });
    expect(res.status).toBe(400);
    expect(res.body.errors.title._errors).toContain('Title is required');
  });

  it('returns 500 when service throws', async () => {
    mockCreateIssue.mockRejectedValue(new Error('fail'));
    const res = await request(app)
      .post('/api/report')
      .send({ title: 'Error Test' });
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('fail');
  });
});
