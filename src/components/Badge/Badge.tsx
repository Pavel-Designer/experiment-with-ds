import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type BadgeProps = ComponentPropsWithRef<'span'> & {
  tone?: BadgeTone;
  /** A status dot. Optional; never rely on it as the only indicator. */
  dot?: boolean;
};

const TONES: Record<BadgeTone, { badge: string; dot: string }> = {
  neutral: { badge: 'bg-muted text-muted', dot: 'bg-slate-400' },
  info: { badge: 'bg-info-subtle text-info', dot: 'bg-info' },
  success: { badge: 'bg-success-subtle text-success', dot: 'bg-success' },
  warning: { badge: 'bg-warning-subtle text-warning', dot: 'bg-warning' },
  danger: { badge: 'bg-danger-subtle text-danger', dot: 'bg-danger' },
};

export function Badge({ tone = 'neutral', dot = false, className, children, ...props }: BadgeProps) {
  const styles = TONES[tone];
  return (
    <span
      className={cx(
        'inline-flex h-6.5 items-center gap-2 whitespace-nowrap rounded-full px-3 text-caption',
        styles.badge,
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden className={cx('size-1.5 shrink-0 rounded-full', styles.dot)} />}
      {children}
    </span>
  );
}
