import type { Meta, StoryObj } from '@storybook/react-vite';
import { artwork } from '../../examples/marketplace/artwork';
import { Badge } from '../Badge/Badge';
import { Delta } from '../Delta/Delta';
import { MediaCard } from './MediaCard';

const meta = {
  title: 'Components/Media card',
  component: MediaCard,
  tags: ['autodocs'],
  args: {
    image: artwork('Prism Drifters'),
    title: 'Prism Drifters',
    subtitle: 'By studiokite',
    href: '#',
  },
  argTypes: { image: { control: false }, meta: { control: false }, badge: { control: false } },
  render: (args) => (
    <div className="w-60">
      <MediaCard {...args} />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A card led by square media, for collections, items and drops. With `href`, the whole card is one link. Hover lifts it to shadow md.',
      },
    },
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    meta: (
      <>
        <span className="flex flex-col">
          <span className="text-caption text-subtle">Floor</span>
          <span className="tabular-nums">1.42 ETH</span>
        </span>
        <Delta value={12.4} />
      </>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    image: artwork('Early Lanterns'),
    title: 'Early Lanterns',
    subtitle: 'By kiln',
    badge: (
      <Badge tone="success" dot>
        Minting now
      </Badge>
    ),
    meta: (
      <>
        <span className="text-caption text-subtle">Mint price</span>
        <span className="tabular-nums">0.02 ETH</span>
      </>
    ),
  },
};
