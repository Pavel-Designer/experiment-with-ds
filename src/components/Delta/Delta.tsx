import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx';

export type DeltaProps = Omit<ComponentPropsWithRef<'span'>, 'children'> & {
  /** Change in percent, e.g. 3.3 or -1.2. */
  value: number;
  /** Decimal places. */
  precision?: number;
};

/** A signed percentage change: green when up, red when down. The sign carries the meaning, not only the color. */
export function Delta({ value, precision = 1, className, ...props }: DeltaProps) {
  const text = new Intl.NumberFormat('en-US', {
    style: 'percent',
    signDisplay: 'exceptZero',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value / 100);
  return (
    <span
      className={cx(
        'font-semibold whitespace-nowrap tabular-nums',
        value > 0 ? 'text-success' : value < 0 ? 'text-danger' : 'text-subtle',
        className,
      )}
      {...props}
    >
      {text}
    </span>
  );
}
