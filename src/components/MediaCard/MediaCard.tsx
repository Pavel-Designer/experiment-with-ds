import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type MediaCardProps = {
  /** Image URL for the square media area. */
  image: string;
  title: string;
  /** e.g. "By Studio Kite". */
  subtitle?: ReactNode;
  /** Footer content, e.g. a price and a Delta. */
  meta?: ReactNode;
  /** Overlay in the top-left corner, e.g. a Badge. */
  badge?: ReactNode;
  /** Makes the whole card a link. */
  href?: string;
  className?: string;
};

/** A card led by square media: collections, items, drops. */
export function MediaCard({ image, title, subtitle, meta, badge, href, className }: MediaCardProps) {
  return (
    <article
      className={cx(
        'group relative flex flex-col overflow-hidden rounded-lg border border-default bg-surface transition-shadow hover:shadow-md',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-(--border-color-focus)',
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-subtle">
        <img
          src={image}
          alt=""
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
        />
        {badge && <div className="absolute top-3 left-3">{badge}</div>}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="truncate text-body-small font-semibold text-default">
          {href ? (
            <a href={href} className="outline-none after:absolute after:inset-0">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {subtitle && <p className="truncate text-caption text-subtle">{subtitle}</p>}
        {meta && <div className="mt-2 flex items-center justify-between gap-2 text-body-small">{meta}</div>}
      </div>
    </article>
  );
}
