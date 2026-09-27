import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Toggle',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Email notifications', description: 'Weekly digest and product updates', disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
  decorators: [
    (Story) => (
      <div className="w-68">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'For settings that apply immediately. Component name in code: `Switch`.' } },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = { args: { defaultChecked: true } };
export const Off: Story = { args: { label: 'Public profile', description: 'Visible to teammates only' } };
export const Disabled: Story = {
  args: { label: 'Two-factor auth', description: 'Requires admin approval', disabled: true },
};

/** The Settings pattern from Figma. */
export const Settings: Story = {
  render: () => (
    <div className="flex flex-col gap-4 rounded-lg border border-default bg-subtle p-4">
      <Switch label="Email notifications" description="Weekly digest and product updates" defaultChecked />
      <Switch label="Public profile" description="Visible to teammates only" />
      <Switch label="Two-factor auth" description="Requires admin approval" disabled />
    </div>
  ),
};
