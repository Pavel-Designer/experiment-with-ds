import type { Meta, StoryObj } from '@storybook/react-vite';
import { artwork } from '../../examples/marketplace/artwork';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { initials: 'AR', name: 'Ava Rodriguez', color: 'blue', size: 'sm', shape: 'circle' },
  argTypes: {
    color: { control: 'inline-radio', options: ['blue', 'violet', 'neutral'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Initials or an image. Circles for people, squares for collections and projects. Sizes are 28, 40 and 56px. Initials use the 11px caption size at minimum; the 9px in Figma is too small to read.',
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};

export const WithImage: Story = { args: { src: artwork('Moss Guardians'), size: 'md', name: 'Moss Guardians' } };

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="AR" name="Ava Rodriguez" color="blue" size="sm" />
      <Avatar initials="AR" name="Ava Rodriguez" color="blue" size="md" />
      <Avatar initials="AR" name="Ava Rodriguez" color="blue" size="lg" />
      <Avatar src={artwork('Neon Koi')} name="Neon Koi" size="sm" shape="square" />
      <Avatar src={artwork('Neon Koi')} name="Neon Koi" size="md" shape="square" />
      <Avatar src={artwork('Neon Koi')} name="Neon Koi" size="lg" shape="square" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup extra={3}>
      <Avatar initials="AR" name="Ava Rodriguez" color="blue" />
      <Avatar initials="ML" name="Marco Lee" color="violet" />
    </AvatarGroup>
  ),
};
