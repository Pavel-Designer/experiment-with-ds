import type { Preview } from '@storybook/react-vite';
import theme from './theme';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    docs: { theme },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Color', 'Typography', 'Spacing', 'Shape and depth'], 'Components'],
      },
    },
  },
};

export default preview;
