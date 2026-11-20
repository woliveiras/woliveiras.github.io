# Task API lab

- This project runs on Node.js 24 or later. It uses TypeScript and the Node.js standard library.
- HTTP routing and input handling live in `src/app.ts`. The server entry point is `src/server.ts`.
- Run `npm test` after each change. The active exercise spec names any additional test command.
- Treat `contracts/` as acceptance criteria. Leave those tests unchanged when implementing a feature.
- Keep invalid requests free of state changes and return errors as `{ "error": "machine_readable_code" }`.
- Ask before adding dependencies or moving code outside the scope of the current spec.
