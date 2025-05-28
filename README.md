# Bolt.new Issue Reporting API

A Node.js + TypeScript REST API to let Bolt.new users (including non-developers) report issues directly from the browser.  
Reports are automatically filed as GitHub issues, complete with context and error details.

## Features

- **POST /api/report** endpoint  
- Validates inputs using TypeScript types  
- Creates GitHub issues via [`@octokit/rest`](https://github.com/octokit/rest.js)  
- Structured error handling and logging  
- Configurable via environment variables

## Getting Started

1. **Clone** the repo  
   ```bash
   git clone git@github.com:<you>/bolt-issue-api.git
   cd bolt-issue-api
Install dependencies

bash
Copy
Edit
npm install
Configure .env in project root:

env
Copy
Edit
PORT=3001
GITHUB_TOKEN=your_github_token
GITHUB_REPO_OWNER=your_username
GITHUB_REPO_NAME=bolt.new
Run in dev mode

bash
Copy
Edit
npm run dev
POST an issue

bash
Copy
Edit
curl -X POST http://localhost:3001/api/report \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Desc","context":{}}'
Scripts
npm run dev — start in watch mode

npm run build — transpile to /dist

npm start — run production

npm run lint — ESLint

npm run test — Jest tests

License
MIT

