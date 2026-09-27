import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type ChipProps = ComponentPropsWithRef<'button'> & {
  /** Selected chips use the primary tint. */
  selected?: boolean;
  icon?: ReactNode;
};

/** A toggleable filter, usually in a row of categories. */
export function Chip({ selected = false, icon, type = 'button', className, children, ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx(
        'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-body-small font-semibold whitespace-nowrap transition-colors [&_svg]:size-4',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)',
        selected
          ? 'border-transparent bg-primary-subtle text-primary'
          : 'border-control bg-surface text-muted hover:bg-subtle hover:text-default',
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
