# experiment-with-ds

An experiment: turning the **Northstar** design system from Figma into React components, documented in Storybook.

**Storybook: https://pavel-designer.github.io/experiment-with-ds/** (updates automatically on every push to `main`)

## Roadmap

- [x] 1. Set up the repo
- [x] 2. Tokens (colors, type, spacing)
- [x] 3. Storybook
- [ ] 4. Components
  - [x] Button
  - [ ] Text input
  - [ ] Badge
  - [ ] Checkbox and Toggle
  - [ ] Cards
- [x] 5. Put Storybook online

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
