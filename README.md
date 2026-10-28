# Learning Hub (prototype)

A searchable Learning & Development knowledgebase built with [Astro Starlight](https://starlight.astro.build/).
Articles are text files in this repository; every merged change rebuilds and republishes the site automatically.

**What's in the prototype**

- Home page with search, topics and a "Recently reviewed" list
- Articles with a **Reviewed / Review due** badge and an **Article info** slide-out (owner, reviewer, review dates, change history from Git)
- **Walk me through it** — any article's steps become a one-step-at-a-time guided walkthrough
- **Try it** card for linking an Articulate or click-through simulation
- Built-in search across every article
- A weekly check that lists articles due for review

> All content is sample content with [bracketed placeholders]. Don't put real internal procedures in a public repository — see *Making it private* below.

---

## Publish it on GitHub Pages (one-time setup, ~10 minutes)

1. **Create the repository.** On GitHub, select **New repository**, name it `learning-hub`, and create it (leave "Add a README" unchecked).
2. **Upload the files.** On the new repo's page, select **uploading an existing file**, drag in everything from this folder (including the hidden `.github` folder), and commit to `main`.
   - Tip: on a Mac, press <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>.</kbd> in Finder to show hidden folders like `.github`.
3. **Turn on Pages.** Go to **Settings → Pages**, and under **Build and deployment → Source** choose **GitHub Actions**.
4. **Run the first publish.** Go to the **Actions** tab, open **Publish site**, and select **Run workflow**. When it turns green (2–3 minutes), the site is live at `https://<your-username>.github.io/learning-hub/`.

After that, every merge into `main` republishes the site automatically.

## Require a review before changes go live (recommended)

**Settings → Branches → Add branch ruleset** (or *branch protection rule*) for `main`:
- Require a pull request before merging
- Require 1 approval

On a personal account this works on public repos for free; on private repos it needs a paid GitHub plan.

## Editing content

See the **For editors → How to edit the Learning Hub** page on the site, or `src/content/docs/editors/how-to-edit.md`.
In short: edit the article file in GitHub → open a pull request → reviewer approves → it's live.

New articles start from `templates/article-template.mdx`.

## Where things live

| Path | What it is |
|---|---|
| `src/content/docs/` | All articles, one folder per topic |
| `src/content.config.ts` | The front matter fields articles can use |
| `src/components/PageTitle.astro` | Review badge + Article info slide-out |
| `src/components/Walkthrough.astro` | Guided walkthrough |
| `src/components/TryIt.astro` | Simulation card |
| `src/styles/theme.css` | Colors and fonts — change the accent here |
| `astro.config.mjs` | Site title and sidebar sections |
| `public/simulations/` | Put Storyline/Rise web exports here |
| `.github/workflows/` | Auto-publish and weekly review check |

## Run it on your computer (optional)

Requires [Node.js](https://nodejs.org/) 22 or newer.

```bash
npm install
npm run dev        # preview at http://localhost:4321 with live reload
npm run build      # build the final site into dist/
npm run check-reviews
```

## Making it private (for real content)

GitHub Pages sites are public on free plans. Before adding real procedures, move hosting to one of:
- **GitHub Enterprise Cloud** — Pages sites can be restricted to your organization's members.
- **Azure Static Web Apps** with Microsoft (Entra ID) sign-in — only your company's accounts can open it. The build is the same (`npm run build`, output in `dist/`); IT swaps the publish workflow.
