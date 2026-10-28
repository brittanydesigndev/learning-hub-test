import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Extra fields every article can carry in its front matter.
// These feed the review badge and the "Article info" slide-out.
const articleFields = z.object({
	topic: z.string().optional(),
	audience: z.array(z.string()).optional(),
	type: z.enum(['How-to', 'Policy', 'Job aid', 'FAQ', 'Video', 'Overview']).optional(),
	owner: z.string().optional(),
	owner_team: z.string().optional(),
	reviewed_by: z.string().optional(),
	reviewer_role: z.string().optional(),
	last_reviewed: z.coerce.date().optional(),
	next_review: z.coerce.date().optional(),
	walkthrough_checked: z.coerce.date().optional(),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: articleFields }),
	}),
};
