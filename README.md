# Bolt.new Issue Reporting API

A Node.js + TypeScript REST API to let Bolt.new users (including non-developers) report issues directly from the browser. Reports are automatically filed as GitHub issues with relevant context.

---

## Features

- **POST /api/report** endpoint for submitting issue reports.
- Validates inputs using Zod schemas for strong typing and runtime safety.
- Creates GitHub issues via [`@octokit/rest`](https://github.com/octokit/rest.js).
- Structured error handling and centralized logging.
- Configurable via environment variables with validation.
- Linting, formatting, and Git hooks for consistent code quality.
- Unit and integration tests for core functionality.

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the API](#running-the-api)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Contributing](#contributing)

## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes.

### Environment Variables

Rename `.env.example` to `.env` and fill in your values:

```env
PORT=3001
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_REPO_OWNER=your_github_username
GITHUB_REPO_NAME=bolt.new
```

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/fredagbona/bolt-issue-api.git
   cd bolt-issue-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up Git hooks** (Husky):

   ```bash
   npm run prepare
   ```

### Running the API

- **Development mode** (with live reload):

  ```bash
  npm run dev
  ```

- **Production mode**:

  ```bash
  npm run build
  npm start
  ```

The API will be available at `http://localhost:3001/api`.

## API Reference

### POST `/api/report`

Submit a new issue report. The request body must adhere to the following schema:

```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "context": { "key": "value" } (optional)
}
```

#### Example Request

```bash
curl -X POST http://localhost:3001/api/report \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Unable to run project",
       "description": "I can\'t install dependencies",
       "context": { "url": "https://bolt.new/project" }
     }'
```

#### Successful Response (201)

```json
{ "issueUrl": "https://github.com/your-username/bolt.new/issues/123" }
```

#### Validation Error (400)

```json
{ "errors": { "title": { "_errors": ["Title is required"] } } }
```

#### Server Error (500)

```json
{ "error": "Internal Server Error" }
```

## Project Structure

```
bolt-issue-api/
├── src/
│   ├── controllers/
│   │   └── reportController.ts
│   ├── routes/
│   │   └── reportRoutes.ts
│   ├── services/
│   │   └── githubService.ts
│   ├── middleware/
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── config/
│   │   └── index.ts
│   ├── schemas/
│   │   └── reportSchema.ts
│   ├── utils/
│   │   └── logger.ts
│   └── server.ts
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## Testing

### Unit Tests

- Use **Jest** for unit testing core components, such as `GitHubService` and controllers.
- Run:

  ```bash
  npm test
  ```

### Integration Tests

- Use **Supertest** to test the Express routes end-to-end (mocking GitHub API calls where necessary).

### Coverage

A coverage report is generated after tests. Aim for at least **80% coverage** on critical files.

## Code Quality

- **ESLint** for linting. Run:

  ```bash
  npm run lint
  ```

- **Prettier** for formatting. Run:

  ```bash
  npm run format
  ```

- **Husky** + **lint-staged** automatically run these on staged changes.

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/XYZ`.
3. Commit your changes with clear messages.
4. Open a Pull Request describing your changes.
