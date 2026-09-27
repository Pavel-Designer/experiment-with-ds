import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { Button, type ButtonVariant } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Continue', variant: 'primary', loading: false, disabled: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    disabled: { control: 'boolean', description: 'Dims the button and blocks clicks.' },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      description: 'Defaults to `button`, so it never submits a form by accident.',
    },
    icon: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use one primary action per region. Labels start with a verb and describe the immediate outcome. 40px high, 16px horizontal padding, 8px gap, radius 8.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Ghost: Story = { args: { variant: 'ghost', children: 'Learn more' } };

export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete item' } };

export const WithIcon: Story = { args: { icon: <Plus />, children: 'Create project' } };

export const Loading: Story = { args: { loading: true, children: 'Loading' } };

export const Disabled: Story = { args: { disabled: true } };

const ROWS: { variant: ButtonVariant; title: string; description: string; label: string }[] = [
  { variant: 'primary', title: 'Primary', description: 'Main action on a page or flow', label: 'Continue' },
  { variant: 'secondary', title: 'Secondary', description: 'Alternative or supporting action', label: 'Continue' },
  { variant: 'ghost', title: 'Ghost', description: 'Low-emphasis action in dense UI', label: 'Learn more' },
  { variant: 'destructive', title: 'Destructive', description: 'Irreversible or risky action', label: 'Delete item' },
];

/** The "Button variants" grid from Figma, plus a Focus column that is new in code (keyboard focus ring). */
export const AllStates: Story = {
  parameters: {
    layout: 'padded',
    pseudo: { hover: ['.state-hover'], focusVisible: ['.state-focus'] },
  },
  render: () => (
    <div className="grid min-w-[900px] grid-cols-[200px_repeat(5,1fr)] items-center text-default">
      {['Variant', 'Default', 'Hover', 'Focus', 'Disabled', 'Loading'].map((column, index) => (
        <span
          key={column}
          className={`pb-4 font-mono text-caption uppercase text-subtle ${index > 0 ? 'text-center' : ''}`}
        >
          {column}
        </span>
      ))}
      {ROWS.map(({ variant, title, description, label }) => (
        <div key={variant} className="contents [&>*]:flex [&>*]:min-h-18 [&>*]:border-b [&>*]:border-default">
          <div className="flex-col justify-center gap-1">
            <span className="text-body-small">{title}</span>
            <span className="text-caption text-subtle">{description}</span>
          </div>
          <div className="items-center justify-center">
            <Button variant={variant}>{label}</Button>
          </div>
          <div className="items-center justify-center">
            <Button variant={variant} className="state-hover">
              {label}
            </Button>
          </div>
          <div className="items-center justify-center">
            <Button variant={variant} className="state-focus">
              {label}
            </Button>
          </div>
          <div className="items-center justify-center">
            <Button variant={variant} disabled>
              {label}
            </Button>
          </div>
          <div className="items-center justify-center">
            <Button variant={variant} loading>
              Loading
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
};
