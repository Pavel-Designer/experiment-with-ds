import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type IconButtonProps = Omit<ComponentPropsWithRef<'button'>, 'children'> & {
  /** Accessible name, also shown as a tooltip. Required because there is no visible text. */
  label: string;
  /** e.g. `<Settings />` from lucide-react. */
  icon: ReactNode;
  variant?: 'ghost' | 'secondary';
  /** 32 or 40px. */
  size?: 'sm' | 'md';
  /** Marks the current item, e.g. in a toolbar. */
  active?: boolean;
};

const VARIANTS = {
  ghost: 'border-transparent text-muted enabled:hover:bg-subtle enabled:hover:text-default',
  secondary: 'border-control bg-surface text-default enabled:hover:bg-subtle',
};

export function IconButton({
  label,
  icon,
  variant = 'ghost',
  size = 'md',
  active = false,
  type = 'button',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-md border transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)',
        'disabled:cursor-not-allowed disabled:opacity-72',
        size === 'md' ? 'size-10 [&_svg]:size-4.5' : 'size-8 [&_svg]:size-4',
        active ? 'border-transparent bg-primary-subtle text-primary' : VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {icon}
    </button>
  );
}
