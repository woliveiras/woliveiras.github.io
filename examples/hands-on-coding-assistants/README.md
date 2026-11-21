# Hands-on Coding Assistants lab

This is a small, in-memory task API for the book exercises. It needs Git and Node.js 24 or later. The application and its tests use the Node.js standard library. The `.nvmrc` file names the Node version used for the book's coverage checks.

Run `npm test` on the starter. Three tests should pass. Run `npm start` to serve the API on `127.0.0.1:3000` and stop it with Ctrl+C. Restarting the server resets the sample data.

Open this directory as its own Git repository if you extracted the book archive. Commit the starter so you can compare each exercise with the original implementation.

| Command | Expected on the starter |
| --- | --- |
| `npm test` | Passes. Checks health, task creation, and rejection of a blank task title. |
| `npm run test:registration` | Fails until you implement `specs/registration-validation.md`. |
| `npm run test:labels` | Fails until you implement `specs/task-labels.md`. |
| `npm run test:mcp` | Passes. Checks the local project-context server without a model or network. |

The two feature exercises can start from the same commit. Later chapters show how to add instructions, skills, a reviewer, and an MCP server to this project. Work with the built-in sample data. The lab uses fictional email addresses and runs without external accounts.
