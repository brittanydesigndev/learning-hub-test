import { execFileSync } from 'node:child_process';

export interface HistoryEntry {
	date: Date;
	author: string;
	message: string;
}

/**
 * Reads an article's change history from Git at build time.
 * Each commit becomes one entry in the "Article info" panel, so a clear
 * commit message (e.g. "Updated step 3 for new lease template") matters.
 */
export function getHistory(filePath: string, limit = 6): HistoryEntry[] {
	try {
		const out = execFileSync(
			'git',
			['log', '--follow', `-n${limit}`, '--format=%aI%x1f%an%x1f%s', '--', filePath],
			{ encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }
		);
		return out
			.split('\n')
			.filter(Boolean)
			.map((line) => {
				const [iso, author, message] = line.split('\x1f');
				return { date: new Date(iso), author, message };
			});
	} catch {
		// Not a Git checkout (or Git missing): show no history rather than fail the build.
		return [];
	}
}
