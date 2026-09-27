import { useEffect, useImperativeHandle, useRef, type ComponentPropsWithRef } from 'react';
import { Search } from 'lucide-react';
import { cx } from '../../utils/cx';

export type SearchFieldProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> & {
  /** Accessible name. The field has no visible label, so this is required. */
  label: string;
  /** A single key that focuses the field from anywhere on the page, e.g. "/". Shown as a hint. */
  shortcut?: string;
};

export function SearchField({ label, shortcut, className, ref, ...props }: SearchFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);

  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      if (event.key === shortcut && !typing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [shortcut]);

  return (
    <div
      className={cx(
        'flex h-10 items-center gap-2 rounded-md border border-control bg-surface px-3 transition-colors',
        'focus-within:border-focus focus-within:inset-ring-1 focus-within:inset-ring-(--border-color-focus)',
        className,
      )}
    >
      <Search aria-hidden strokeWidth={1.75} className="size-4 shrink-0 text-subtle" />
      <input
        ref={inputRef}
        type="search"
        aria-label={label}
        aria-keyshortcuts={shortcut}
        className="min-w-0 flex-1 bg-transparent text-body-small text-default outline-none placeholder:text-subtle [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      {shortcut && (
        <kbd
          aria-hidden
          className="flex h-5 min-w-5 items-center justify-center rounded-xs border border-default bg-subtle px-1 font-mono text-caption text-subtle"
        >
          {shortcut}
        </kbd>
      )}
    </div>
  );
}
