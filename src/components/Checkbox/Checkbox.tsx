import { useEffect, useImperativeHandle, useRef, type ComponentPropsWithRef, type ReactNode } from 'react';
import { Check, Minus } from 'lucide-react';
import { cx } from '../../utils/cx';

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  label: ReactNode;
  description?: ReactNode;
  /** Shows a dash for a partly selected group. */
  indeterminate?: boolean;
  /** Hides the label visually but keeps it for screen readers, e.g. in table rows. */
  hideLabel?: boolean;
};

export function Checkbox({
  label,
  description,
  indeterminate = false,
  hideLabel = false,
  className,
  ref,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);
  // `indeterminate` is a DOM property, not an HTML attribute, so it has to be set in JS.
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={cx('inline-flex items-start gap-3 has-disabled:cursor-not-allowed has-disabled:opacity-55', className)}
    >
      <span className={cx('relative flex size-4.5 shrink-0', !hideLabel && 'mt-px')}>
        <input
          ref={inputRef}
          type="checkbox"
          className={cx(
            'peer size-4.5 appearance-none rounded-xs border-[1.5px] border-control bg-surface transition-colors',
            'checked:border-transparent checked:bg-primary indeterminate:border-transparent indeterminate:bg-primary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)',
            'disabled:cursor-not-allowed',
          )}
          {...props}
        />
        <Check
          aria-hidden
          strokeWidth={2.25}
          className="pointer-events-none absolute inset-0 m-auto hidden size-3 text-inverse peer-checked:block peer-indeterminate:hidden"
        />
        <Minus
          aria-hidden
          strokeWidth={2.25}
          className="pointer-events-none absolute inset-0 m-auto hidden size-3 text-inverse peer-indeterminate:block"
        />
      </span>
      <span className={cx('flex flex-col gap-0.5', hideLabel && 'sr-only')}>
        <span className="text-body-small text-default">{label}</span>
        {description && <span className="text-caption text-subtle">{description}</span>}
      </span>
    </label>
  );
}
