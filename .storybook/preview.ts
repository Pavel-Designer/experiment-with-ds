import type { Preview } from '@storybook/react-vite';
import theme from './theme';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    docs: { theme },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Color', 'Typography', 'Spacing', 'Shape and depth'],
          'Components',
          [
            'Button',
            'Icon button',
            'Text input',
            'Search field',
            'Badge',
            'Chip',
            'Checkbox',
            'Toggle',
            'Segmented control',
            'Card',
            'Media card',
            'Avatar',
            'Stat',
            'Delta',
          ],
          'Patterns',
          'Examples',
        ],
      },
    },
  },
};

export default preview;
