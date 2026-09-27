import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';
import { TextField, type TextFieldProps } from './TextField';

const meta = {
  title: 'Components/Text input',
  component: TextField,
  tags: ['autodocs'],
  args: {
    label: 'Email address',
    placeholder: 'name@company.com',
    helperText: 'Use your work email address.',
    icon: <Mail strokeWidth={1.75} />,
    disabled: false,
  },
  argTypes: {
    icon: { control: false },
    onClear: { control: false },
    disabled: { control: 'boolean' },
  },
  render: (args) => (
    <div className="w-100">
      <TextField {...args} />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label + field + helper. Keep labels visible and validation specific. Validate after blur, preserve what the user typed, and put the correction directly under the field.',
      },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

function ClearableField(props: TextFieldProps) {
  const [value, setValue] = useState('ava@northstar.io');
  return (
    <TextField {...props} value={value} onChange={(event) => setValue(event.target.value)} onClear={() => setValue('')} />
  );
}

export const Default: Story = {};

export const Filled: Story = {
  render: (args) => (
    <div className="w-100">
      <ClearableField {...args} />
    </div>
  ),
};

export const WithError: Story = {
  name: 'Error',
  args: { defaultValue: 'ava@', error: 'Enter a complete email address.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Managed by your workspace', helperText: 'This field is unavailable.' },
};

const STATE_LABEL = 'font-mono text-caption uppercase text-subtle';

/** The "Text input" card from Figma. */
export const AllStates: Story = {
  parameters: { layout: 'padded', pseudo: { focusWithin: ['.state-focus > div'] } },
  render: (args) => (
    <div className="grid w-[900px] grid-cols-3 gap-x-6 gap-y-6">
      <div className="flex flex-col gap-1">
        <span className={STATE_LABEL}>Default</span>
        <TextField {...args} />
      </div>
      <div className="flex flex-col gap-1">
        <span className={STATE_LABEL}>Focus</span>
        <TextField {...args} className="state-focus" />
      </div>
      <div className="flex flex-col gap-1">
        <span className={STATE_LABEL}>Filled</span>
        <ClearableField {...args} />
      </div>
      <div className="flex flex-col gap-1">
        <span className={STATE_LABEL}>Error</span>
        <TextField {...args} defaultValue="ava@" error="Enter a complete email address." />
      </div>
      <div className="flex flex-col gap-1">
        <span className={STATE_LABEL}>Disabled</span>
        <TextField {...args} disabled defaultValue="Managed by your workspace" helperText="This field is unavailable." />
      </div>
      <div className="flex flex-col gap-2 self-center rounded-md bg-info-subtle p-4 text-body-small">
        <p className="text-info">Validation pattern</p>
        <p className="text-muted">
          Validate after blur. Preserve user input and place the correction directly beneath the affected field.
        </p>
      </div>
    </div>
  ),
};
