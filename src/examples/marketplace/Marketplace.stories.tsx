import type { Meta, StoryObj } from '@storybook/react-vite';
import { Marketplace } from './Marketplace';

const meta = {
  title: 'Examples/Marketplace',
  component: Marketplace,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'An NFT marketplace home page built only from Northstar components. All names, prices and artwork are generated sample data.',
      },
    },
  },
} satisfies Meta<typeof Marketplace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Marketplace' };
