# Validate registrations before storing them

`POST /registrations` takes a JSON object with a name and an email. The starter coerces values to strings and stores them. Validate the input before assigning an ID or changing state.

## Acceptance criteria

- The name is a string of 1 to 100 characters after trimming whitespace. Store the trimmed value.
- The email is a string. Trim whitespace, convert to lowercase, and require a simple address shape with one `@`, a non-empty local part, and no internal whitespace. The domain must contain a dot separating two non-empty parts. Store the normalized value.
- Invalid input returns HTTP 400 and `{ "error": "invalid_registration" }`. A rejected request leaves the next ID available.
- A valid request still returns HTTP 201 with `id`, `name`, and `email`.
- `npm test` and `npm run test:registration` pass. Leave the acceptance tests unchanged.

Make the change in `src/app.ts`. Keep the API in memory and use the existing error format. Email delivery, domain verification, and authentication are outside this exercise.
