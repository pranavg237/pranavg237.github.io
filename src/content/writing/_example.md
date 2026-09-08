---
title: An example post
description: The frontmatter format for posts in this collection. Prefixed with an underscore, so the build ignores it.
date: 2026-09-07
draft: true
---

This file is a format reference, not a post. `draft: true` in the frontmatter
keeps it out of the build: draft entries are never routed and never listed, so
no page is generated for them. The leading underscore is a naming convention
for humans — `draft` is what the build actually honours.

To write a real post, copy this file to `src/content/writing/some-slug.md`,
drop the underscore, and set `draft: false` when it is ready to publish.

Note that `/writing` is not linked from the site's navigation yet. Once a real
post exists, add the link to the footer in `src/components/Footer.astro` and
remove the `/writing` exclusion from the sitemap filter in `astro.config.mjs`.

## A heading

Body copy. Same voice as the rest of the site — first person, plain, specific,
sentence case, numbers where they exist.

- A list item.
- Another list item.

Inline `code` works, and so do fenced blocks:

```python
def sharpe(returns, rf=0.0, periods=252):
    excess = returns - rf / periods
    return excess.mean() / excess.std() * (periods ** 0.5)
```

Links look like [this](https://example.com).
