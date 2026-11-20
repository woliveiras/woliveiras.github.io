import { createApp } from "./app.ts";

const port = Number(process.env.PORT ?? 3000);
createApp().listen(port, "127.0.0.1", () => {
	console.log(`Task API is listening on http://127.0.0.1:${port}`);
});
