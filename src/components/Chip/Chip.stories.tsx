import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'Art', selected: false },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggleable filter. Selected chips use the primary tint and report `aria-pressed` to screen readers.',
      },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };

const CATEGORIES = ['All', 'Art', 'PFPs', 'Photography', 'Gaming', 'Music'];

/** Single choice, like the category filter in the Marketplace example. */
export const FilterRow: Story = {
  render: function Render() {
    const [selected, setSelected] = useState('All');
    return (
      <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <Chip key={category} selected={category === selected} onClick={() => setSelected(category)}>
            {category}
          </Chip>
        ))}
      </div>
    );
  },
};
