// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow
// (.github/workflows/deploy.yml). Locally they fall back to the root.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'Learning Hub',
			description: 'Learning & Development knowledgebase: steps, policies and job aids.',
			logo: { src: './src/assets/logo.svg' },
			customCss: [
				'@fontsource-variable/plus-jakarta-sans',
				'@fontsource/ibm-plex-mono/500.css',
				'./src/styles/theme.css',
			],
			components: {
				// Adds the review badge, "Article info" button and slide-out panel.
				PageTitle: './src/components/PageTitle.astro',
			},
			sidebar: [
				{ label: 'Home', link: '/' },
				{ label: 'Renewals', items: [{ autogenerate: { directory: 'renewals' } }] },
				{ label: 'Move-in & move-out', items: [{ autogenerate: { directory: 'move-in' } }] },
				{ label: 'Screening', items: [{ autogenerate: { directory: 'screening' } }] },
				{ label: 'For editors', items: [{ autogenerate: { directory: 'editors' } }] },
			],
			lastUpdated: true,
			pagination: false,
		}),
	],
});
