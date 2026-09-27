import { useState, type FormEvent, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar, Folder, User } from 'lucide-react';
import { Badge, type BadgeTone } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Switch } from '../components/Switch/Switch';
import { TextField } from '../components/TextField/TextField';

const meta = {
  title: 'Patterns',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Reusable layouts for everyday product workflows, built only from Northstar components. Compared with Figma: each field has a fitting icon, the action buttons are real Buttons with a gap, and names are no longer cut off.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** The pattern container from Figma: slate 50 surface, border, radius 12, padding 16. */
function Panel({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4 rounded-lg border border-default bg-subtle p-4">{children}</div>;
}

function ProjectForm() {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('Ava Rodriguez');
  const [dueDate, setDueDate] = useState('Oct 24, 2026');
  const [nameError, setNameError] = useState<string>();

  const validateName = () => setNameError(name.trim() ? undefined : 'Enter a project name.');
  const submit = (event: FormEvent) => {
    event.preventDefault();
    validateName();
  };

  return (
    <form onSubmit={submit} noValidate>
      <Panel>
        <div className="flex flex-col gap-3">
          <TextField
            label="Project name"
            placeholder="Onboarding refresh"
            icon={<Folder strokeWidth={1.75} />}
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={validateName}
            error={nameError}
          />
          <TextField
            label="Owner"
            icon={<User strokeWidth={1.75} />}
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            onClear={() => setOwner('')}
          />
          <TextField
            label="Due date"
            icon={<Calendar strokeWidth={1.75} />}
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            onClear={() => setDueDate('')}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" className="w-full">
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            Create
          </Button>
        </div>
      </Panel>
    </form>
  );
}

const PROJECTS: { name: string; status: string; tone: BadgeTone }[] = [
  { name: 'Onboarding refresh', status: 'Complete', tone: 'success' },
  { name: 'Billing migration', status: 'Needs review', tone: 'warning' },
  { name: 'API docs', status: 'In progress', tone: 'info' },
];

function ProjectTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const allSelected = selected.length === PROJECTS.length;
  const toggle = (name: string) =>
    setSelected((current) =>
      current.includes(name) ? current.filter((project) => project !== name) : [...current, name],
    );

  return (
    <div className="overflow-hidden rounded-lg border border-default bg-surface">
      <table className="w-full text-left">
        <thead className="border-b border-default bg-subtle">
          <tr>
            <th className="w-4.5 py-3.25 pr-3 pl-4">
              <Checkbox
                label="Select all projects"
                hideLabel
                checked={allSelected}
                indeterminate={selected.length > 0 && !allSelected}
                onChange={() => setSelected(allSelected ? [] : PROJECTS.map((project) => project.name))}
              />
            </th>
            <th className="py-3.25 text-label text-muted">Project</th>
            <th className="py-3.25 pr-4 text-label text-muted">Status</th>
          </tr>
        </thead>
        <tbody>
          {PROJECTS.map(({ name, status, tone }) => (
            <tr key={name} className="border-b border-default last:border-0">
              <td className="py-2.25 pr-3 pl-4">
                <Checkbox label={`Select ${name}`} hideLabel checked={selected.includes(name)} onChange={() => toggle(name)} />
              </td>
              <td className="py-2.25 text-body-small text-default">{name}</td>
              <td className="py-2.25 pr-4">
                <Badge tone={tone} dot>
                  {status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SettingsPanel() {
  return (
    <Panel>
      <Switch label="Email notifications" description="Weekly digest and product updates" defaultChecked />
      <Switch label="Public profile" description="Visible to teammates only" />
      <Switch label="Two-factor auth" description="Requires admin approval" disabled />
    </Panel>
  );
}

const REVIEW_DETAILS = [
  ['Role', 'Product designer'],
  ['Workspace', 'Northstar'],
  ['Last active', '2h ago'],
];

function ReviewCard() {
  return (
    <Panel>
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-info-subtle text-body-small font-bold text-info"
        >
          AR
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="text-body-small text-default">Ava Rodriguez</p>
          <p className="text-caption text-subtle">Ready for review</p>
        </div>
        <Badge tone="success" dot>
          Complete
        </Badge>
      </div>
      <dl className="flex flex-col gap-3 text-caption">
        {REVIEW_DETAILS.map(([term, value]) => (
          <div key={term} className="flex justify-between gap-4">
            <dt className="text-subtle">{term}</dt>
            <dd className="text-default">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary" className="w-full">
          Edit
        </Button>
        <Button className="w-full">Approve</Button>
      </div>
    </Panel>
  );
}

const PATTERNS = [
  { title: 'Form', meta: 'inputs + actions', content: <ProjectForm /> },
  { title: 'Table', meta: 'rows + selection', content: <ProjectTable /> },
  { title: 'Settings', meta: 'toggles + disabled', content: <SettingsPanel /> },
  { title: 'Review', meta: 'summary + actions', content: <ReviewCard /> },
];

/** The "Product UI patterns" section from Figma. Everything is interactive. */
export const AllPatterns: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid w-full max-w-[1312px] grid-cols-4 items-start gap-4">
      {PATTERNS.map(({ title, meta, content }) => (
        <section key={title} className="flex flex-col gap-4 rounded-lg border border-default bg-surface p-6">
          <header className="flex items-baseline justify-between gap-2">
            <h3 className="text-heading-3 text-default">{title}</h3>
            <span className="font-mono text-caption text-subtle">{meta}</span>
          </header>
          {content}
        </section>
      ))}
    </div>
  ),
};

/** Validates the project name after blur and on submit. Try leaving it empty. */
export const Form: Story = {
  render: () => (
    <div className="w-80">
      <ProjectForm />
    </div>
  ),
};

/** Select rows, or use the header checkbox to select all. */
export const Table: Story = {
  render: () => (
    <div className="w-100">
      <ProjectTable />
    </div>
  ),
};

export const Settings: Story = {
  render: () => (
    <div className="w-80">
      <SettingsPanel />
    </div>
  ),
};

export const Review: Story = {
  render: () => (
    <div className="w-80">
      <ReviewCard />
    </div>
  ),
};
