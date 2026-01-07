import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';
import { z } from "astro/zod";



export const collections = {
    docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
    blob: defineCollection({
        loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/blog" }),
        schema: z.object({
            title: z.string(),
            description: z.string(),
            pubDate: z.coerce.date(),
        }),
    }),
};
