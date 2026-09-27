import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx';

export type AvatarColor = 'blue' | 'violet' | 'neutral';

export type AvatarProps = ComponentPropsWithRef<'span'> & {
  /** One or two letters, or a count like "+3". */
  initials: string;
  /** Full name for screen readers. */
  name?: string;
  color?: AvatarColor;
};

const COLORS: Record<AvatarColor, string> = {
  blue: 'bg-blue-100',
  violet: 'bg-violet-100',
  neutral: 'bg-subtle',
};

export function Avatar({ initials, name, color = 'neutral', className, ...props }: AvatarProps) {
  return (
    <span
      role={name ? 'img' : undefined}
      aria-label={name}
      className={cx(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-white',
        'text-caption font-bold text-muted',
        COLORS[color],
        className,
      )}
      {...props}
    >
      <span aria-hidden={name ? true : undefined}>{initials}</span>
    </span>
  );
}

export type AvatarGroupProps = ComponentPropsWithRef<'div'> & {
  /** People not shown, rendered as a "+N" avatar. */
  extra?: number;
};

/** Overlapping avatars for a team or assignee list. */
export function AvatarGroup({ extra, className, children, ...props }: AvatarGroupProps) {
  return (
    <div className={cx('flex -space-x-1.5', className)} {...props}>
      {children}
      {extra ? <Avatar initials={`+${extra}`} name={`${extra} more`} /> : null}
    </div>
  );
}
