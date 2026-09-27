import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { initials: 'AR', name: 'Ava Rodriguez', color: 'blue' },
  argTypes: { color: { control: 'inline-radio', options: ['blue', 'violet', 'neutral'] } },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '28px initials avatar. Initials use the 11px caption size; the 9px in Figma is too small to read.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const Group: Story = {
  render: () => (
    <AvatarGroup extra={3}>
      <Avatar initials="AR" name="Ava Rodriguez" color="blue" />
      <Avatar initials="ML" name="Marco Lee" color="violet" />
    </AvatarGroup>
  ),
};
