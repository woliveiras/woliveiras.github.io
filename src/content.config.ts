import { defineCollection, z } from "astro:content";
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog/" }),
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

import { authorFeedLoader } from "@ascorbic/bluesky-loader";
import { BLUESKY_IDENTIFIER } from "./config.json";


const posts = defineCollection({
  loader: authorFeedLoader({
    identifier: BLUESKY_IDENTIFIER,
  }),
});

export const collections = { blog, posts };
