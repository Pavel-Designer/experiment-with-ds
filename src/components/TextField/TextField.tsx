import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { CircleAlert, CircleX } from 'lucide-react';
import { cx } from '../../utils/cx';

export type TextFieldProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & {
  /** Always visible. Placeholders are not labels. */
  label: string;
  /** Guidance under the field. Replaced by `error` when there is one. */
  helperText?: string;
  /** Marks the field invalid and replaces the helper text. Validate after blur. */
  error?: string;
  /** Optional leading icon, e.g. `<Mail />` from lucide-react. */
  icon?: ReactNode;
  /** Shows a clear button while a controlled `value` is not empty. */
  onClear?: () => void;
};

export function TextField({
  label,
  helperText,
  error,
  icon,
  onClear,
  disabled,
  id,
  className,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? helperText;
  const hasValue = props.value !== undefined && String(props.value).length > 0;

  return (
    <div className={cx('flex flex-col gap-2', className)}>
      {/* When disabled, the label and field fade; the helper text stays readable because it explains why. */}
      <label htmlFor={inputId} className={cx('text-label text-default', disabled && 'opacity-68')}>
        {label}
      </label>
      <div
        className={cx(
          'flex h-10 items-center gap-2 rounded-md border px-3 transition-colors [&_svg]:size-4 [&_svg]:shrink-0',
          disabled ? 'border-control bg-subtle opacity-68' : 'bg-surface',
          !disabled &&
            (error
              ? 'border-danger'
              : 'border-control focus-within:border-focus focus-within:inset-ring-1 focus-within:inset-ring-(--border-color-focus)'),
        )}
      >
        {icon && (
          <span aria-hidden className={cx('flex', disabled ? 'text-subtle' : 'text-muted')}>
            {icon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className="min-w-0 flex-1 bg-transparent text-body-small text-default outline-none placeholder:text-subtle disabled:cursor-not-allowed"
          {...props}
        />
        {error ? (
          <CircleAlert aria-hidden strokeWidth={1.75} className="text-danger" />
        ) : (
          onClear &&
          hasValue &&
          !disabled && (
            <button
              type="button"
              onClick={onClear}
              aria-label={`Clear ${label}`}
              className="flex rounded-full text-subtle hover:text-muted focus-visible:outline-2 focus-visible:outline-(--border-color-focus)"
            >
              <CircleX strokeWidth={1.75} />
            </button>
          )
        )}
      </div>
      {message && (
        <p id={messageId} className={cx('text-caption', error ? 'text-danger' : 'text-subtle')}>
          {message}
        </p>
      )}
    </div>
  );
}
