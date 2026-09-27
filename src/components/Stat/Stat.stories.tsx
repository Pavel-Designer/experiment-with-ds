import type { Meta, StoryObj } from '@storybook/react-vite';
import { Delta } from '../Delta/Delta';
import { Stat, StatGroup } from './Stat';

const meta = {
  title: 'Components/Stat',
  component: Stat,
  tags: ['autodocs'],
  args: { label: 'Floor price', value: '1.42 ETH' },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A labeled number. Put stats in a `StatGroup`, which renders a description list. Use `inverse` on images and dark fills.',
      },
    },
  },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StatGroup>
      <Stat {...args} />
    </StatGroup>
  ),
};

export const Group: Story = {
  render: () => (
    <StatGroup>
      <Stat
        label="Floor price"
        value={
          <>
            1.42 ETH <Delta value={12.4} className="text-body-small" />
          </>
        }
      />
      <Stat label="Items" value="8,888" />
      <Stat label="Total volume" value="18.2K ETH" />
      <Stat label="Listed" value="3.1%" />
    </StatGroup>
  ),
};

export const Inverse: Story = {
  render: () => (
    <div className="rounded-xl bg-slate-900 p-8">
      <StatGroup inverse>
        <Stat label="Floor price" value="1.42 ETH" />
        <Stat label="Items" value="8,888" />
        <Stat label="Total volume" value="18.2K ETH" />
      </StatGroup>
    </div>
  ),
};
