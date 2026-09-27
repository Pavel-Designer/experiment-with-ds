import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, type BadgeTone } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'In progress', tone: 'info', dot: true },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Status and category labels. Use short noun or state labels. Status text uses the 700 shades so it meets WCAG AA.',
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: 'neutral', dot: false, children: 'Neutral' } };
export const Info: Story = { args: { tone: 'info', children: 'In progress' } };
export const Success: Story = { args: { tone: 'success', children: 'Complete' } };
export const Warning: Story = { args: { tone: 'warning', children: 'Needs review' } };
export const Danger: Story = { args: { tone: 'danger', children: 'Failed' } };

const SET: { tone: BadgeTone; label: string }[] = [
  { tone: 'neutral', label: 'Neutral' },
  { tone: 'info', label: 'In progress' },
  { tone: 'success', label: 'Complete' },
  { tone: 'warning', label: 'Needs review' },
  { tone: 'danger', label: 'Failed' },
];

/** The "Badges" card from Figma: with a status dot, and without. */
export const AllTones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        {SET.map(({ tone, label }) => (
          <Badge key={tone} tone={tone} dot={tone !== 'neutral'}>
            {label}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {SET.map(({ tone, label }) => (
          <Badge key={tone} tone={tone}>
            {label}
          </Badge>
        ))}
      </div>
    </div>
  ),
};
