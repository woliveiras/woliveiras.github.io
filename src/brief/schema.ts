import { z } from "zod";

export const BRIEF_TOPICS = {
	agents: "AI engineering and agent architecture",
	"local-ai": "Local AI",
	security: "Security and privacy",
	"edge-ai": "Edge AI",
	"mobile-ai": "Mobile AI",
	reliability: "Reliability, evaluation, and observability",
	efficiency: "Hybrid architectures, efficiency, and cost",
} as const;

export type BriefTopicId = keyof typeof BRIEF_TOPICS;

const calendarDate = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, "Use a date in YYYY-MM-DD format.")
	.refine((value) => {
		const date = new Date(value);
		return (
			!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
		);
	}, "Enter a valid calendar date.")
	.transform((value) => new Date(`${value}T00:00:00.000Z`));

export const briefSchema = z
	.object({
		title: z.string().trim().min(1),
		slug: z
			.string()
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a kebab-case slug.")
			.refine(
				(value) => value !== "pages",
				'The slug "pages" is reserved for the archive.',
			),
		description: z.string().trim().min(1),
		pubDate: calendarDate,
		updatedDate: calendarDate.optional(),
		issue: z.number().int().positive().optional(),
		period: z.object({
			start: calendarDate,
			end: calendarDate,
		}),
		published: z.boolean().default(false),
		topics: z
			.array(
				z.enum(Object.keys(BRIEF_TOPICS) as [BriefTopicId, ...BriefTopicId[]]),
			)
			.min(1)
			.refine(
				(topics) => new Set(topics).size === topics.length,
				"Do not repeat a topic.",
			),
	})
	.superRefine((data, context) => {
		if (data.period.start > data.period.end) {
			context.addIssue({
				code: "custom",
				path: ["period", "end"],
				message: "The coverage period cannot end before it starts.",
			});
		}
		if (data.period.end > data.pubDate) {
			context.addIssue({
				code: "custom",
				path: ["period", "end"],
				message: "The coverage period cannot end after publication.",
			});
		}
		if (data.updatedDate && data.updatedDate < data.pubDate) {
			context.addIssue({
				code: "custom",
				path: ["updatedDate"],
				message: "The update date cannot precede publication.",
			});
		}
	});

export type BriefData = z.infer<typeof briefSchema>;
