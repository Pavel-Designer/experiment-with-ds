import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../utils/cx';

export type AvatarColor = 'blue' | 'violet' | 'neutral';
export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = ComponentPropsWithRef<'span'> & {
  /** One or two letters, or a count like "+3". Shown when there is no image. */
  initials?: string;
  /** Image URL. Falls back to initials. */
  src?: string;
  /** Full name for screen readers. */
  name?: string;
  color?: AvatarColor;
  /** 28, 40 or 56px. */
  size?: AvatarSize;
  /** Circles for people, squares for collections and projects. */
  shape?: 'circle' | 'square';
};

const COLORS: Record<AvatarColor, string> = {
  blue: 'bg-blue-100',
  violet: 'bg-violet-100',
  neutral: 'bg-subtle',
};

const SIZES: Record<AvatarSize, { box: string; text: string; square: string }> = {
  sm: { box: 'size-7', text: 'text-caption', square: 'rounded-sm' },
  md: { box: 'size-10', text: 'text-body-small', square: 'rounded-md' },
  lg: { box: 'size-14', text: 'text-heading-3', square: 'rounded-lg' },
};

export function Avatar({
  initials,
  src,
  name,
  color = 'neutral',
  size = 'sm',
  shape = 'circle',
  className,
  ...props
}: AvatarProps) {
  const sizing = SIZES[size];
  return (
    <span
      role={name ? 'img' : undefined}
      aria-label={name}
      className={cx(
        'inline-flex shrink-0 items-center justify-center overflow-hidden border-2 border-white font-bold text-muted',
        sizing.box,
        sizing.text,
        shape === 'circle' ? 'rounded-full' : sizing.square,
        COLORS[color],
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        <span aria-hidden={name ? true : undefined}>{initials}</span>
      )}
    </span>
  );
}

export type AvatarGroupProps = ComponentPropsWithRef<'div'> & {
  /** People not shown, rendered as a "+N" avatar. */
  extra?: number;
};

/** Overlapping avatars for a team or assignee list. */
export function AvatarGroup({ extra, className, children, ...props }: AvatarGroupProps) {
  return (
    <div className={cx('flex -space-x-1.5', className)} {...props}>
      {children}
      {extra ? <Avatar initials={`+${extra}`} name={`${extra} more`} /> : null}
    </div>
  );
}
