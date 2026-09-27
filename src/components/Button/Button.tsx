import type { ComponentPropsWithRef, ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cx } from '../../utils/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  /** Use one primary action per region. */
  variant?: ButtonVariant;
  /** Shows a spinner in place of the icon and blocks clicks. The label stays visible. */
  loading?: boolean;
  /** Optional leading icon, e.g. `<Plus />` from lucide-react. */
  icon?: ReactNode;
};

const BASE = cx(
  'inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4',
  'text-body-small font-semibold transition-colors [&_svg]:size-4 [&_svg]:shrink-0',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)',
);

const VARIANTS: Record<ButtonVariant, { enabled: string; disabled: string }> = {
  primary: {
    enabled: 'border-transparent bg-primary text-inverse shadow-xs enabled:hover:bg-primary-hover',
    disabled: 'border-transparent bg-violet-100 text-violet-900',
  },
  secondary: {
    enabled: 'border-control bg-surface text-default enabled:hover:bg-subtle',
    disabled: 'border-default bg-surface text-disabled',
  },
  ghost: {
    enabled: 'border-transparent text-primary enabled:hover:bg-primary-subtle',
    disabled: 'border-transparent text-disabled',
  },
  destructive: {
    enabled: 'border-transparent bg-danger text-inverse enabled:hover:bg-danger-hover',
    disabled: 'border-transparent bg-red-200 text-red-800',
  },
};

export function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = VARIANTS[variant];
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        BASE,
        disabled ? cx(styles.disabled, 'cursor-not-allowed opacity-72') : styles.enabled,
        loading && 'cursor-progress',
        className,
      )}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden strokeWidth={1.75} className="motion-safe:animate-spin" /> : icon}
      {children}
    </button>
  );
}
