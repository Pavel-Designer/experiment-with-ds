import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta = {
  title: 'Components/Search field',
  component: SearchField,
  tags: ['autodocs'],
  args: { label: 'Search collections', placeholder: 'Search Northstar Market', shortcut: '/' },
  render: (args) => (
    <div className="w-100">
      <SearchField {...args} />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A search input without a visible label, so `label` is required for screen readers. With `shortcut`, pressing that key anywhere on the page focuses the field. Try pressing "/".',
      },
    },
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutShortcut: Story = { args: { shortcut: undefined } };
export const Focused: Story = {
  parameters: { pseudo: { focusWithin: true } },
  args: { defaultValue: 'Prism' },
};
