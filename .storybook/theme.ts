import { create } from 'storybook/theming/create';

// Storybook's own UI, branded with Northstar's primary color (violet 600).
export default create({
  base: 'light',
  brandTitle: 'Northstar',
  brandUrl: 'https://github.com/Pavel-Designer/experiment-with-ds',
  colorPrimary: '#6D28D9',
  colorSecondary: '#6D28D9',
  fontBase: '"Inter Variable", Inter, system-ui, sans-serif',
  fontCode: '"Roboto Mono Variable", "Roboto Mono", ui-monospace, monospace',
});
