# experiment-with-ds

An experiment: turning the **Northstar** design system from Figma into React components, documented in Storybook.

**Storybook: https://pavel-designer.github.io/experiment-with-ds/** (updates automatically on every push to `main`)

## Roadmap

- [x] 1. Set up the repo
- [x] 2. Tokens (colors, type, spacing)
- [x] 3. Storybook
- [x] 4. Components
  - [x] Button
  - [x] Text input
  - [x] Badge
  - [x] Checkbox and Toggle
  - [x] Cards (project, metric, empty state) and Avatar
- [x] 5. Put Storybook online
- [x] 6. Patterns (form, table, settings, review) and a marketplace example page

## What's inside

- **Foundations**: color, typography, spacing, shape and depth, generated from the tokens
- **Components**: Button, Icon button, Text input, Search field, Badge, Chip, Checkbox, Toggle, Segmented control, Card (project, metric, empty state), Media card, Avatar, Stat, Delta
- **Patterns**: form, table, settings and review, from the Figma file
- **Examples**: Marketplace, an NFT marketplace home page built only from Northstar components (sample data and generated artwork)

## Getting started

```bash
npm install
npm run storybook
```

Storybook opens at http://localhost:6006. The Foundations pages (color, typography, spacing, shape and depth) are generated from the tokens.

## Tokens

The design tokens live in [`tokens/`](tokens) as [W3C design token](https://www.designtokens.org/) JSON:

- `color.json`: the color ramps from Figma
- `semantic.json`: what each color is for (`bg`, `text`, `border`)
- `foundations.json`: type scale, spacing, radius, shadows

After editing them, run `npm run tokens` to regenerate [`src/styles/tokens.css`](src/styles/tokens.css) and the Storybook docs. Every token becomes a Tailwind class, for example `bg-surface`, `text-muted`, `border-control`, `text-heading-1`, `rounded-md` and `shadow-xs`.
