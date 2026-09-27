import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChevronLeft, ChevronRight, Compass, Settings, ShoppingBag } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/Icon button',
  component: IconButton,
  tags: ['autodocs'],
  args: { label: 'Settings', icon: <Settings strokeWidth={1.75} />, variant: 'ghost', size: 'md', active: false },
  argTypes: {
    icon: { control: false },
    variant: { control: 'inline-radio', options: ['ghost', 'secondary'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A button with only an icon. The `label` is required: screen readers announce it and it shows as a tooltip.',
      },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', label: 'Cart', icon: <ShoppingBag strokeWidth={1.75} /> } };
export const Active: Story = { args: { active: true, label: 'Discover', icon: <Compass strokeWidth={1.75} /> } };

export const AllStates: Story = {
  parameters: { pseudo: { hover: ['.state-hover'], focusVisible: ['.state-focus'] } },
  render: () => (
    <div className="grid grid-cols-[auto_repeat(5,48px)] items-center gap-x-4 gap-y-3">
      {['', 'Default', 'Hover', 'Focus', 'Active', 'Disabled'].map((column) => (
        <span key={column} className="text-center font-mono text-caption uppercase text-subtle">
          {column}
        </span>
      ))}
      {(['ghost', 'secondary'] as const).map((variant) => (
        <div key={variant} className="contents">
          <span className="text-body-small capitalize">{variant}</span>
          <IconButton variant={variant} label="Settings" icon={<Settings strokeWidth={1.75} />} />
          <IconButton variant={variant} label="Settings" icon={<Settings strokeWidth={1.75} />} className="state-hover" />
          <IconButton variant={variant} label="Settings" icon={<Settings strokeWidth={1.75} />} className="state-focus" />
          <IconButton variant={variant} label="Settings" icon={<Settings strokeWidth={1.75} />} active />
          <IconButton variant={variant} label="Settings" icon={<Settings strokeWidth={1.75} />} disabled />
        </div>
      ))}
      <span className="text-body-small">Small</span>
      <IconButton size="sm" variant="secondary" label="Previous" icon={<ChevronLeft />} />
      <IconButton size="sm" variant="secondary" label="Next" icon={<ChevronRight />} />
    </div>
  ),
};
