import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type SegmentedControlProps<T extends string> = {
  /** Accessible name for the group. */
  label: string;
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  /** 32 or 40px. */
  size?: 'sm' | 'md';
  className?: string;
};

/** A single choice between a few views or ranges. Arrow keys move the selection. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  size = 'md',
  className,
}: SegmentedControlProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cx('inline-flex gap-0.5 rounded-md bg-muted p-0.5', size === 'md' ? 'h-10' : 'h-8', className)}
    >
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cx(
              'flex items-center justify-center rounded-sm px-3 text-body-small font-semibold whitespace-nowrap transition-colors',
              'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--border-color-focus)',
              selected ? 'bg-surface text-default shadow-xs' : 'text-muted hover:text-default',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
