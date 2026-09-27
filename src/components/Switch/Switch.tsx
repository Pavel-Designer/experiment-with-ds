import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type SwitchProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  label: ReactNode;
  description?: ReactNode;
};

/** A toggle for settings that apply immediately. The label sits on the left, the switch on the right. */
export function Switch({ label, description, disabled, className, ...props }: SwitchProps) {
  return (
    <label className={cx('flex items-center justify-between gap-3', disabled && 'cursor-not-allowed', className)}>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className={cx('text-body-small', disabled ? 'text-subtle' : 'text-default')}>{label}</span>
        {description && (
          <span className={cx('text-caption', disabled ? 'text-disabled' : 'text-subtle')}>{description}</span>
        )}
      </span>
      <span className={cx('relative flex h-5.5 w-10 shrink-0', disabled && 'opacity-72')}>
        <input
          type="checkbox"
          role="switch"
          disabled={disabled}
          className={cx(
            'peer absolute inset-0 appearance-none rounded-full bg-slate-200 transition-colors checked:bg-primary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)',
            'disabled:cursor-not-allowed motion-reduce:transition-none',
          )}
          {...props}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-0.5 left-0.5 size-4.5 rounded-full bg-surface transition-transform peer-checked:translate-x-4.5 motion-reduce:transition-none"
        />
      </span>
    </label>
  );
}
