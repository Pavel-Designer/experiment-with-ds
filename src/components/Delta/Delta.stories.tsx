import type { Meta, StoryObj } from '@storybook/react-vite';
import { Delta } from './Delta';

const meta = {
  title: 'Components/Delta',
  component: Delta,
  tags: ['autodocs'],
  args: { value: 3.3, precision: 1 },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A signed percentage change. Green when up, red when down, gray at zero. The + and − signs carry the meaning, so it never relies on color alone. It inherits the surrounding font size.',
      },
    },
  },
} satisfies Meta<typeof Delta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Up: Story = {};
export const Down: Story = { args: { value: -1.2 } };
export const Unchanged: Story = { args: { value: 0 } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-baseline gap-6">
      <Delta value={187.6} className="text-heading-2" />
      <Delta value={-7.3} className="text-body-small" />
      <Delta value={0.4} className="text-caption" />
    </div>
  ),
};
