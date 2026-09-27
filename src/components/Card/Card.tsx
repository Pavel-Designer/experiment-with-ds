import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { Ellipsis } from 'lucide-react';
import { cx } from '../../utils/cx';
import { Avatar, AvatarGroup, type AvatarColor } from '../Avatar/Avatar';
import { Badge, type BadgeTone } from '../Badge/Badge';

export type CardProps = ComponentPropsWithRef<'div'> & {
  /** Adds shadow xs. Prefer spacing and hierarchy over decoration. */
  elevated?: boolean;
};

/** The default recipe: white surface, slate 200 border, radius 12. Add padding (usually `p-6`) yourself. */
export function Card({ elevated = false, className, ...props }: CardProps) {
  return (
    <div
      className={cx('rounded-lg border border-default bg-surface', elevated && 'shadow-xs', className)}
      {...props}
    />
  );
}

export type ProjectCardProps = {
  title: string;
  /** e.g. "12 tasks · Updated 2h ago" */
  meta: string;
  status?: { label: string; tone: BadgeTone };
  members?: { initials: string; name: string; color?: AvatarColor }[];
  /** Members not shown, rendered as "+N". */
  extraMembers?: number;
  onMoreClick?: () => void;
  /** CSS background for the cover, e.g. an image url(). Defaults to a blue-indigo gradient. */
  cover?: CSSProperties['background'];
  className?: string;
};

export function ProjectCard({
  title,
  meta,
  status,
  members = [],
  extraMembers,
  onMoreClick,
  cover,
  className,
}: ProjectCardProps) {
  return (
    <Card elevated className={cx('flex flex-col overflow-hidden', className)}>
      <div aria-hidden className="h-24 bg-linear-to-b from-blue-100 to-indigo-100" style={cover ? { background: cover } : undefined} />
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="truncate text-heading-3 text-default">{title}</h3>
            <p className="text-body-small text-subtle">{meta}</p>
          </div>
          {status && (
            <Badge tone={status.tone} dot>
              {status.label}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <AvatarGroup extra={extraMembers}>
            {members.map((member) => (
              <Avatar key={member.name} initials={member.initials} name={member.name} color={member.color} />
            ))}
          </AvatarGroup>
          <button
            type="button"
            onClick={onMoreClick}
            aria-label={`More actions for ${title}`}
            className="flex rounded-sm p-0.5 text-subtle transition-colors hover:bg-subtle hover:text-muted focus-visible:outline-2 focus-visible:outline-(--border-color-focus)"
          >
            <Ellipsis aria-hidden strokeWidth={1.75} className="size-4.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export type MetricCardProps = {
  label: string;
  value: string;
  /** e.g. "+4.2%" */
  delta?: string;
  deltaTone?: BadgeTone;
  /** e.g. "vs last 30 days" */
  period?: string;
  /** Bar heights for the trend; they are scaled to the largest value. */
  data?: number[];
  /** How many of the most recent bars to highlight. */
  highlight?: number;
  icon?: ReactNode;
  className?: string;
};

export function MetricCard({
  label,
  value,
  delta,
  deltaTone = 'success',
  period,
  data,
  highlight = 3,
  icon,
  className,
}: MetricCardProps) {
  const max = data ? Math.max(...data) : 0;
  return (
    <Card className={cx('flex flex-col gap-6 p-6', className)}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-body-small font-semibold text-muted">{label}</p>
        {icon && (
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-md bg-primary-subtle text-primary [&_svg]:size-4"
          >
            {icon}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-metric text-default">{value}</p>
        {(delta || period) && (
          <div className="flex items-center gap-2">
            {delta && <Badge tone={deltaTone}>{delta}</Badge>}
            {period && <span className="text-caption text-subtle">{period}</span>}
          </div>
        )}
      </div>
      {data && data.length > 0 && (
        <div aria-hidden className="flex h-13 items-end gap-2">
          {data.map((point, index) => (
            <span
              key={index}
              className={cx(
                'min-w-px flex-1 rounded-t-xs',
                index >= data.length - highlight ? 'bg-primary' : 'bg-violet-300',
              )}
              style={{ height: `${(point / max) * 100}%` }}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  /** Usually a primary Button. */
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div
      className={cx(
        'flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-default bg-surface p-6 text-center',
        className,
      )}
    >
      {icon && (
        <span
          aria-hidden
          className="flex size-12 items-center justify-center rounded-full bg-subtle text-muted [&_svg]:size-5.5"
        >
          {icon}
        </span>
      )}
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-heading-3 text-default">{title}</h3>
        {description && <p className="max-w-65 text-body-small text-subtle">{description}</p>}
      </div>
      {action}
    </div>
  );
}
