import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Product updates', indeterminate: false, disabled: false },
  argTypes: { disabled: { control: 'boolean' } },
  parameters: {
    layout: 'centered',
    docs: { description: { component: '18px control. Violet marks the selected state.' } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = { args: { label: 'Weekly digest' } };
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { label: 'Select team', indeterminate: true } };
export const Disabled: Story = { args: { label: 'Required policy', disabled: true } };
export const WithDescription: Story = {
  args: { label: 'Product updates', description: 'New features and improvements, once a month.' },
};

/** The "Checkboxes" card from Figma. */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
      <Checkbox label="Weekly digest" />
      <Checkbox label="Select team" indeterminate />
      <Checkbox label="Product updates" defaultChecked />
      <Checkbox label="Required policy" disabled />
    </div>
  ),
};

const TEAM = ['Ava Rodriguez', 'Marco Lee', 'Sam Patel'];

/** Try it: the team checkbox is indeterminate while only some people are selected. */
export const SelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([TEAM[0]]);
    const all = selected.length === TEAM.length;
    return (
      <div className="flex flex-col gap-3">
        <Checkbox
          label="Select team"
          checked={all}
          indeterminate={selected.length > 0 && !all}
          onChange={() => setSelected(all ? [] : TEAM)}
        />
        <div className="flex flex-col gap-3 pl-7.5">
          {TEAM.map((name) => (
            <Checkbox
              key={name}
              label={name}
              checked={selected.includes(name)}
              onChange={() =>
                setSelected((current) =>
                  current.includes(name) ? current.filter((person) => person !== name) : [...current, name],
                )
              }
            />
          ))}
        </div>
      </div>
    );
  },
};
