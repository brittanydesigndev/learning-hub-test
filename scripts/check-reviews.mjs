// Lists articles whose next_review date has passed or is within 30 days.
// Run locally with: npm run check-reviews
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DOCS = 'src/content/docs';
const SOON_DAYS = 30;

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (/\.mdx?$/.test(entry.name)) yield path;
	}
}

function field(frontmatter, name) {
	const m = frontmatter.match(new RegExp(`^${name}:\\s*"?([^"\\n]+)"?`, 'm'));
	return m ? m[1].trim() : null;
}

const today = new Date();
const soon = new Date(today.getTime() + SOON_DAYS * 86400000);
const overdue = [];
const upcoming = [];

for await (const file of walk(DOCS)) {
	const text = await readFile(file, 'utf8');
	const fm = text.match(/^---\n([\s\S]*?)\n---/);
	if (!fm) continue;
	const next = field(fm[1], 'next_review');
	if (!next) continue;
	const row = {
		title: field(fm[1], 'title') ?? file,
		owner: field(fm[1], 'owner') ?? '—',
		next,
		file: relative('.', file),
	};
	const date = new Date(next);
	if (date < today) overdue.push(row);
	else if (date < soon) upcoming.push(row);
}

const table = (rows) =>
	['| Article | Owner | Review date | File |', '|---|---|---|---|', ...rows.map((r) => `| ${r.title} | ${r.owner} | ${r.next} | \`${r.file}\` |`)].join('\n');

console.log('## Content review check\n');
console.log(`### Overdue (${overdue.length})\n`);
console.log(overdue.length ? table(overdue) : 'None.');
console.log(`\n### Due in the next ${SOON_DAYS} days (${upcoming.length})\n`);
console.log(upcoming.length ? table(upcoming) : 'None.');
