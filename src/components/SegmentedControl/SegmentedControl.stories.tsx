import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Components/Segmented control',
  component: SegmentedControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'One choice between a few options that switch a view, like a time range. It is a radio group: Tab moves into it, arrow keys change the selection.',
      },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const RANGES = (['1h', '1d', '7d', '30d'] as const).map((value) => ({ value, label: value }));

export const TimeRange: Story = {
  args: { label: 'Time range', options: RANGES, value: '1d', onChange: () => {} },
  render: function Render() {
    const [value, setValue] = useState<(typeof RANGES)[number]['value']>('1d');
    return <SegmentedControl label="Time range" options={RANGES} value={value} onChange={setValue} />;
  },
};

export const Small: Story = {
  args: { label: 'Asset type', options: [], value: '', onChange: () => {} },
  render: function Render() {
    const [value, setValue] = useState<'nfts' | 'tokens'>('nfts');
    return (
      <SegmentedControl
        label="Asset type"
        size="sm"
        value={value}
        onChange={setValue}
        options={[
          { value: 'nfts', label: 'NFTs' },
          { value: 'tokens', label: 'Tokens' },
        ]}
      />
    );
  },
};
