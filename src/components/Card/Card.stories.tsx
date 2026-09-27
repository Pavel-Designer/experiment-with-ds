import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartNoAxesColumnIncreasing, FolderPlus } from 'lucide-react';
import { Button } from '../Button/Button';
import { Card, EmptyState, MetricCard, ProjectCard } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Cards group one idea and its related actions. Prefer spacing and hierarchy over decorative borders. Default recipe: surface white, border slate 200, radius 12, padding 24, shadow xs optional.',
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const project = (
  <ProjectCard
    title="Onboarding refresh"
    meta="12 tasks · Updated 2h ago"
    status={{ label: 'On track', tone: 'success' }}
    members={[
      { initials: 'AR', name: 'Ava Rodriguez', color: 'blue' },
      { initials: 'ML', name: 'Marco Lee', color: 'violet' },
    ]}
    extraMembers={3}
  />
);

const metric = (
  <MetricCard
    label="Activation rate"
    value="68.4%"
    delta="+4.2%"
    period="vs last 30 days"
    data={[14, 20, 17, 26, 23, 34, 39, 33, 43, 38, 47, 52]}
    icon={<ChartNoAxesColumnIncreasing strokeWidth={1.75} />}
  />
);

const empty = (
  <EmptyState
    title="No projects yet"
    description="Create a project to organize tasks, milestones, and team updates."
    icon={<FolderPlus strokeWidth={1.75} />}
    action={<Button>Create project</Button>}
  />
);

export const Default: Story = {
  render: () => (
    <Card className="w-80 p-6">
      <p className="text-body-small text-muted">Any content, padded 24px.</p>
    </Card>
  ),
};

export const Project: Story = { render: () => <div className="w-99">{project}</div> };

export const Metric: Story = { render: () => <div className="w-111">{metric}</div> };

export const Empty: Story = { name: 'Empty state', render: () => <div className="w-111">{empty}</div> };

/** The "Cards" section from Figma. */
export const AllCards: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-[1312px] grid-cols-[394px_1fr_1fr] gap-4 [&>*]:h-85.5">
      {project}
      {metric}
      {empty}
    </div>
  ),
};
