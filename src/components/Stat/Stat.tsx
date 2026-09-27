import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type StatGroupProps = ComponentPropsWithRef<'dl'> & {
  /** White text for use on images and dark fills. */
  inverse?: boolean;
};

/** A row of stats. Wrap `Stat` items in it; it renders a description list. */
export function StatGroup({ inverse = false, className, ...props }: StatGroupProps) {
  return <dl data-inverse={inverse || undefined} className={cx('group/stats flex flex-wrap gap-x-8 gap-y-4', className)} {...props} />;
}

export type StatProps = ComponentPropsWithRef<'div'> & {
  label: string;
  value: ReactNode;
};

export function Stat({ label, value, className, ...props }: StatProps) {
  return (
    <div className={cx('flex flex-col gap-1', className)} {...props}>
      <dt className="text-caption tracking-wide text-subtle uppercase group-data-inverse/stats:text-inverse/75">
        {label}
      </dt>
      <dd className="flex items-baseline gap-2 text-heading-3 text-default group-data-inverse/stats:text-inverse">
        {value}
      </dd>
    </div>
  );
}
