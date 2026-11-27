import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";
import { briefSchema } from "./brief/schema";

const briefFiles = glob({
	pattern: "[^_]*.{md,mdx}",
	base: "./src/content/brief/",
	// Keep filenames distinct so duplicate editorial slugs cannot overwrite entries.
	generateId: ({ entry }) => entry,
});

const brief = defineCollection({
	loader: {
		name: "brief-files",
		async load(context) {
			// Astro's glob loader returns early for an empty directory. Clear this
			// collection first so deleting every edition also removes cached entries.
			context.store.clear();
			await briefFiles.load(context);
		},
	},
	schema: briefSchema,
});

const blog = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog/" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		// title of the blog post, don't repeat this in the markdown part
		title: z.string(),

		// will be shown in the blog post list
		description: z.string(),

		disableComments: z.boolean().optional(),

		disableLikes: z.boolean().optional(),

		// date published
		pubDate: z.coerce.date(),

		published: z.boolean(),

		// short description will be used for og image (fallback to description)
		shortDescription: z.string().optional(),

		// date updated
		updatedDate: z.coerce.date().optional(),

		// path to the hero image, HAS TO BE IN /src/assets folder
		// and HAS TO START with `/src/assets/`
		heroImage: z.string().optional(),

		// array of tags
		tags: z.array(z.string()).optional(),

		// whether to hide the hero image in the blog post
		hideHero: z.boolean().optional(),

		// whether to hide the hero image in the blog post
		noImage: z.boolean().optional(),

		// whether to use the hero image as the og image (instead of the default `/src/assets/background.png`)
		useHeroAsOGImage: z.boolean().optional(),

		// wether to show title and short description in the og image
		noTextInOGImage: z.boolean().optional(),
	}),
});

const posts = defineCollection({});

const bookChapters = defineCollection({
	loader: glob({
		pattern: "**/[^_]*.{md,mdx}",
		base: "./src/content/books/",
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		module: z.number(),
		order: z.number(),
		kind: z.enum(["dedication", "introduction", "chapter", "glossary", "appendix"]).default("chapter"),
		pageSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
	}),
});

const talks = defineCollection({
	loader: glob({
		pattern: "*/*.mdx",
		base: "./src/content/talks/",
		generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
	}),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lang: z.enum(["en", "pt-BR", "es"]),
		legacySlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
		published: z.boolean(),
	}),
});

export const collections = {
	talks,
	blog,
	brief,
	posts,
	bookChapters,
};
