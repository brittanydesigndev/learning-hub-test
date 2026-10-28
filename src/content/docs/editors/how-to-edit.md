---
title: How to edit the Learning Hub
description: For content owners and SMEs — how to add, update and review articles in GitHub.
---

## Not on GitHub? Send your change to L&D

If you don't edit in GitHub, send your suggested change to the Learning & Development team with the article's title. They review every suggestion and update the article. That's all most SMEs and associates need.

The rest of this page is for the people who maintain the Learning Hub in GitHub.

## How publishing works

Every article is a text file in GitHub. When a change is approved and merged, the site rebuilds and publishes itself in a few minutes.

## Updating an existing article

1. In GitHub, open the article's file under `src/content/docs/` and select the pencil icon to edit it.
2. Make your change. Keep the [article template](#article-template) structure.
3. Update `last_reviewed` and `next_review` at the top if this counts as a review.
4. Select **Commit changes…**, write a short description of what changed (it shows in the article's change history), and choose **Create a new branch and start a pull request**.
5. Ask the article's reviewer to approve the pull request. Once it's merged, the site updates.

## Adding a new article

1. In GitHub, go to `src/content/docs/<topic>/` and select **Add file → Create new file**.
2. Name it in lowercase with dashes, ending in `.md`, for example `notice-to-vacate.md`. Use `.mdx` if you want the walkthrough or "Try it" card.
3. Paste the [article template](#article-template) and fill it in.
4. Commit to a new branch and open a pull request, as above.

## Article template

Copy this from `templates/article-template.mdx` in the repository:

```mdx
---
title: [Action-oriented title, e.g. "Processing a lease renewal"]
description: [One sentence on when to use this]
topic: [Renewals | Move-in & move-out | ...]
audience: [Leasing Agents]
type: How-to
owner: "[Name]"
owner_team: Learning & Development
reviewed_by: "[Name]"
reviewer_role: [Team] SME
last_reviewed: 2026-10-27
next_review: 2027-04-27
---

import Walkthrough from '../../../components/Walkthrough.astro';

## Purpose

## Before you start

## Steps

<Walkthrough>

1. **Step title.** What to do and where.

2. **Step title.** What to do and where.

</Walkthrough>

## Related
```

## Front matter fields

| Field | What it does |
|---|---|
| `title` | The article's heading and search title |
| `topic` | Groups the article; shows in lists |
| `audience` | Teams the article is for, in square brackets |
| `type` | One of How-to, Policy, Job aid, FAQ, Video, Overview |
| `owner`, `owner_team` | Shown in the Article info panel |
| `reviewed_by`, `reviewer_role` | Shown in the Article info panel |
| `last_reviewed` | Drives the green "Reviewed" badge (YYYY-MM-DD) |
| `next_review` | After this date the badge turns to "Review due" |
| `walkthrough_checked` | Optional: when the simulation was last checked |

## Writing steps

- Start every step with a **bold title** ending in a period. The guided walkthrough uses it as the step heading.
- One action per step. If a step needs "and then", split it.
- Add a screenshot under a step with `![Description of the screen](./images/file.png)`.
- Use callouts for warnings:

  ```md
  :::caution[Don't edit the lease]
  Send a revised offer first.
  :::
  ```

## Requesting new content

Send the request to the Learning & Development team with the topic and who the article is for.
