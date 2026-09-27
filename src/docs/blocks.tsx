import type { ReactNode } from 'react';
import { Unstyled } from '@storybook/addon-docs/blocks';
import colorTokens from '../../tokens/color.json';
import generated from './tokens.generated.json';

// Building blocks for the Foundations pages. They render from the generated token
// list (npm run tokens), so the docs always match tokens/*.json.

type Token = {
  name: string;
  cssVar: string;
  type: string;
  value: unknown;
  alias?: string;
  description?: string;
};

type Typography = { fontSize: string; lineHeight: string; fontWeight: number };

const tokens = generated as Token[];
const group = (prefix: string) => tokens.filter((token) => token.name.startsWith(`${prefix}.`));
const find = (name: string) => tokens.find((token) => token.name === name)!;
const cssVar = (token: Token) => `var(${token.cssVar})`;
const withoutPrefix = (token: Token, prefix: string) => token.name.slice(prefix.length + 1);

// "color.slate.50" → "Slate 50"
function colorLabel(name: string) {
  const [, ramp, step] = name.split('.');
  const title = ramp.charAt(0).toUpperCase() + ramp.slice(1);
  return step ? `${title} ${step}` : title;
}

function Card({
  title,
  description,
  meta,
  children,
}: {
  title: string;
  description?: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-default bg-surface text-default">
      <header className="flex items-baseline justify-between gap-4 border-b border-default px-6 py-4">
        <div>
          <h3 className="text-heading-3">{title}</h3>
          {description && <p className="text-caption text-subtle">{description}</p>}
        </div>
        {meta && <p className="font-mono text-caption text-subtle">{meta}</p>}
      </header>
      <div className="p-6">{children}</div>
    </section>
  );
}

const RAMPS = [
  { key: 'violet', title: 'Primary' },
  { key: 'slate', title: 'Neutral' },
  { key: 'green', title: 'Success' },
  { key: 'amber', title: 'Warning' },
  { key: 'red', title: 'Danger' },
  { key: 'blue', title: 'Info' },
] as const;

function Swatch({ token }: { token: Token }) {
  const isBase = token.description === 'Base.';
  return (
    <li className="flex items-start gap-3">
      <span
        className="h-8 w-11 shrink-0 rounded-sm border border-default"
        style={{ background: cssVar(token) }}
      />
      <span className="flex min-w-0 flex-col">
        <span className="text-body-small font-semibold">
          {colorLabel(token.name)}
          {isBase && ' · Base'}
        </span>
        <span className="font-mono text-caption text-subtle">{String(token.value)}</span>
        {token.description && !isBase && (
          <span className="text-caption text-info">{token.description}</span>
        )}
      </span>
    </li>
  );
}

export function ColorRamps() {
  return (
    <Unstyled>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {RAMPS.map(({ key, title }) => {
          const ramp = key === 'slate' ? [find('color.white'), ...group('color.slate')] : group(`color.${key}`);
          return (
            <Card key={key} title={title} description={colorTokens.color[key].$description}>
              <ul className="flex flex-col gap-3">
                {ramp.map((token) => (
                  <Swatch key={token.name} token={token} />
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </Unstyled>
  );
}

const SEMANTIC = [
  { prefix: 'bg', title: 'Background' },
  { prefix: 'text', title: 'Text' },
  { prefix: 'border', title: 'Border' },
] as const;

function SemanticPreview({ prefix, token }: { prefix: string; token: Token }) {
  if (prefix === 'text') {
    const onPrimary = token.name === 'text.inverse';
    return (
      <span
        className="flex h-8 w-11 items-center justify-center rounded-sm border border-default text-body-small font-semibold"
        style={{ color: cssVar(token), background: onPrimary ? 'var(--background-color-primary)' : undefined }}
      >
        Aa
      </span>
    );
  }
  return (
    <span
      className={`block h-8 w-11 rounded-sm ${prefix === 'border' ? 'border-2 bg-surface' : 'border border-default'}`}
      style={prefix === 'border' ? { borderColor: cssVar(token) } : { background: cssVar(token) }}
    />
  );
}

export function SemanticColors() {
  return (
    <Unstyled>
      <div className="flex flex-col gap-4">
        {SEMANTIC.map(({ prefix, title }) => (
          <Card key={prefix} title={title} meta={`${prefix}-*`}>
            <table className="w-full text-left text-body-small">
              <tbody>
                {group(prefix).map((token) => (
                  <tr key={token.name} className="border-b border-default last:border-0">
                    <td className="w-15 py-2">
                      <SemanticPreview prefix={prefix} token={token} />
                    </td>
                    <td className="py-2 pr-4 font-mono">{`${prefix}-${withoutPrefix(token, prefix)}`}</td>
                    <td className="py-2 pr-4 whitespace-nowrap text-muted">
                      {token.alias && colorLabel(token.alias)}{' '}
                      <span className="font-mono text-caption text-subtle">{String(token.value)}</span>
                    </td>
                    <td className="py-2 text-subtle">{token.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        ))}
      </div>
    </Unstyled>
  );
}

const TYPE_SAMPLES: Record<string, string> = {
  display: 'Make work flow.',
  'heading.1': 'Page heading',
  'heading.2': 'Section heading',
  'heading.3': 'Component heading',
  'body.default': 'Readable text for everyday product interfaces.',
  'body.small': 'Supporting copy, metadata, and helper text.',
  label: 'Field label',
  caption: 'Badges, helper text and timestamps.',
};

export function TypeScale() {
  return (
    <Unstyled>
      <Card title="Type scale" meta="Inter · Roboto Mono">
        <div className="flex flex-col">
          {group('typography').map((token) => {
            const style = token.value as Typography;
            const name = withoutPrefix(token, 'typography');
            return (
              <div
                key={token.name}
                className="flex items-center gap-6 border-b border-default py-4 first:pt-0 last:border-0 last:pb-0"
              >
                <div className="flex w-40 shrink-0 flex-col gap-1 font-mono text-caption">
                  <span className="font-semibold">{token.cssVar.slice(2)}</span>
                  <span className="text-subtle">
                    {parseInt(style.fontSize)} / {parseInt(style.lineHeight)} · {style.fontWeight}
                  </span>
                </div>
                <p
                  className="min-w-0 flex-1"
                  style={{
                    fontSize: cssVar(token),
                    lineHeight: `var(${token.cssVar}--line-height)`,
                    fontWeight: `var(${token.cssVar}--font-weight)`,
                    letterSpacing: `var(${token.cssVar}--letter-spacing)`,
                  }}
                >
                  {TYPE_SAMPLES[name]}
                </p>
              </div>
            );
          })}
        </div>
      </Card>
    </Unstyled>
  );
}

export function FontFamilies() {
  const usage: Record<string, string> = { sans: 'Interface text', mono: 'Code and token names' };
  return (
    <Unstyled>
      <div className="grid grid-cols-2 gap-4">
        {group('font.family').map((token) => {
          const name = withoutPrefix(token, 'font.family');
          return (
            <Card key={token.name} title={usage[name]} meta={`font-${name}`}>
              <p className="text-heading-2" style={{ fontFamily: cssVar(token) }}>
                Aa Bb Cc 0123
              </p>
              <p className="mt-2 font-mono text-caption text-subtle">{String(token.value)}</p>
            </Card>
          );
        })}
      </div>
    </Unstyled>
  );
}

export function SpacingScale() {
  return (
    <Unstyled>
      <Card title="Spacing" meta="4px base, true size">
        <div className="flex flex-col gap-3">
          {group('space').map((token) => {
            const step = withoutPrefix(token, 'space');
            return (
              <div key={token.name} className="flex items-center gap-3 font-mono text-caption">
                <span className="w-20 shrink-0 text-muted">{token.name}</span>
                <span
                  className={`h-2 shrink-0 rounded-full ${step === '0' ? 'bg-slate-300' : 'bg-info'}`}
                  style={{ width: step === '0' ? '2px' : cssVar(token) }}
                />
                <span className="text-subtle">{String(token.value)}</span>
                <span className="ml-auto text-subtle">{`p-${step} · gap-${step}`}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </Unstyled>
  );
}

export function RadiusScale() {
  return (
    <Unstyled>
      <Card title="Corner radius" meta="shape tokens">
        <div className="flex flex-wrap gap-6">
          {group('radius').map((token) => (
            <div key={token.name} className="flex w-24 flex-col items-center gap-2 font-mono text-caption">
              <span className="size-14 border border-blue-600 bg-info-subtle" style={{ borderRadius: cssVar(token) }} />
              <span className="font-semibold">{`rounded-${withoutPrefix(token, 'radius')}`}</span>
              <span className="text-subtle">{String(token.value)}</span>
            </div>
          ))}
        </div>
      </Card>
    </Unstyled>
  );
}

export function ShadowScale() {
  return (
    <Unstyled>
      <Card title="Elevation" meta="light surfaces">
        <div className="grid grid-cols-4 gap-4">
          {group('shadow').map((token) => (
            <div key={token.name} className="flex flex-col gap-3">
              <span className="h-16 rounded-md bg-surface" style={{ boxShadow: cssVar(token) }} />
              <span className="font-mono text-caption font-semibold">{`shadow-${withoutPrefix(token, 'shadow')}`}</span>
              <span className="text-caption text-subtle">{token.description?.replace(/\.$/, '')}</span>
            </div>
          ))}
        </div>
      </Card>
    </Unstyled>
  );
}
