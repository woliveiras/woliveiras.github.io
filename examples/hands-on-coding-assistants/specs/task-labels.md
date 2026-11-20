# Add labels to tasks

The task list already supports creating tasks. Add a way to replace a task's labels and filter the list. Keep the existing storage and error response format.

## Acceptance criteria

- `PATCH /tasks/:id/labels` accepts `{ "labels": ["urgent", "bug"] }` and returns HTTP 200 with the updated task. An empty array clears the labels.
- Each label is a string of 1 to 50 characters after trimming. Store lowercase labels, removing duplicates while preserving their first appearance. A task can have at most ten distinct labels.
- An invalid labels payload returns HTTP 400 with `{ "error": "invalid_labels" }` and leaves stored state unchanged. Check the payload before looking up the task. A valid payload for an unknown task returns HTTP 404 with `{ "error": "not_found" }`.
- `GET /tasks?label=urgent` returns matching tasks using the same trim and lowercase rules. A present but blank filter returns an empty list. With no `label` parameter, return all tasks. Preserve `id` and `title`, and include a `labels` array for every task in the list and in creation responses.
- `npm test` and `npm run test:labels` pass. The registration exercise and its test are independent.

Update the existing task responses in `test/app.test.ts` to include the new field. Preserve their assertions about title normalization and invalid input. Leave `contracts/labels.test.ts` unchanged. Persistence, access control, and partial matches are outside this exercise.
