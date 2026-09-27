import { useState, type ReactNode } from 'react';
import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Coins,
  Compass,
  Gift,
  LayoutGrid,
  Palette,
  Rocket,
  Search,
  Settings,
  ShoppingBag,
} from 'lucide-react';
import { Avatar } from '../../components/Avatar/Avatar';
import { Badge } from '../../components/Badge/Badge';
import { Button } from '../../components/Button/Button';
import { EmptyState } from '../../components/Card/Card';
import { Chip } from '../../components/Chip/Chip';
import { Delta } from '../../components/Delta/Delta';
import { IconButton } from '../../components/IconButton/IconButton';
import { MediaCard } from '../../components/MediaCard/MediaCard';
import { SearchField } from '../../components/SearchField/SearchField';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl';
import { Stat, StatGroup } from '../../components/Stat/Stat';
import { cx } from '../../utils/cx';
import { artwork } from './artwork';
import {
  CATEGORIES,
  CHAINS,
  COLLECTIONS,
  DROPS,
  TOKENS,
  formatCompactEth,
  formatEth,
  formatUsd,
  type Collection,
} from './data';

// A marketplace home page in the spirit of large NFT marketplaces, built only from Northstar
// components. Everything here is sample data; the links go nowhere.

const NAV = [
  { label: 'Discover', icon: <Compass />, current: true },
  { label: 'Collections', icon: <LayoutGrid /> },
  { label: 'Tokens', icon: <Coins /> },
  { label: 'Swap', icon: <ArrowLeftRight /> },
  { label: 'Drops', icon: <Rocket /> },
  { label: 'Activity', icon: <Activity /> },
  { label: 'Rewards', icon: <Gift /> },
  { label: 'Studio', icon: <Palette /> },
];

const NAV_LINK = cx(
  'flex size-10 items-center justify-center rounded-md text-muted transition-colors hover:bg-subtle hover:text-default',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)',
  '[&_svg]:size-5 [&_svg]:stroke-[1.75] aria-[current=page]:bg-primary-subtle aria-[current=page]:text-primary',
);

function NavRail() {
  return (
    <nav
      aria-label="Main"
      className="sticky top-0 hidden h-screen w-18 shrink-0 flex-col items-center gap-6 border-r border-default bg-surface py-4 md:flex"
    >
      <a
        href="#"
        aria-label="Northstar Market home"
        className="flex size-9 items-center justify-center rounded-md bg-primary text-body-small font-bold text-inverse"
      >
        N
      </a>
      <ul className="flex flex-col gap-1">
        {NAV.map((item) => (
          <li key={item.label}>
            <a
              href="#"
              aria-label={item.label}
              title={item.label}
              aria-current={item.current ? 'page' : undefined}
              className={NAV_LINK}
            >
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
      <ul className="mt-auto flex flex-col gap-1">
        <li>
          <a href="#" aria-label="Settings" title="Settings" className={NAV_LINK}>
            <Settings />
          </a>
        </li>
        <li>
          <a href="#" aria-label="Profile" title="Profile" className={NAV_LINK}>
            <CircleUser />
          </a>
        </li>
      </ul>
    </nav>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-default bg-surface/90 px-6 backdrop-blur lg:px-8">
      <SearchField
        label="Search collections, tokens and creators"
        placeholder="Search Northstar Market"
        shortcut="/"
        className="w-full max-w-md"
      />
      <div className="ml-auto flex items-center gap-2">
        <IconButton label="Cart" icon={<ShoppingBag strokeWidth={1.75} />} variant="secondary" />
        <Button>Sign in</Button>
      </div>
    </header>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-heading-2 text-default">{title}</h2>
          <p className="text-body-small text-subtle">{subtitle}</p>
        </div>
        <Button variant="ghost">View all</Button>
      </div>
      {children}
    </section>
  );
}

const FEATURED = [COLLECTIONS[0], COLLECTIONS[2], COLLECTIONS[5]];

function Hero() {
  const [index, setIndex] = useState(0);
  const collection = FEATURED[index];
  const go = (step: number) => setIndex((current) => (current + step + FEATURED.length) % FEATURED.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative overflow-hidden rounded-xl bg-slate-900"
    >
      <img src={artwork(collection.name, { width: 1200, height: 420 })} alt="" className="h-105 w-full object-cover" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-slate-900/85 via-slate-900/25 to-transparent" />

      <div className="absolute top-6 left-8 flex gap-2">
        {FEATURED.map((item, itemIndex) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Show ${item.name}`}
            aria-current={itemIndex === index}
            onClick={() => setIndex(itemIndex)}
            className={cx(
              'h-1.5 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
              itemIndex === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80',
            )}
          />
        ))}
      </div>
      <div className="absolute top-5 right-6 flex gap-2">
        <IconButton label="Previous collection" icon={<ChevronLeft />} variant="secondary" size="sm" onClick={() => go(-1)} />
        <IconButton label="Next collection" icon={<ChevronRight />} variant="secondary" size="sm" onClick={() => go(1)} />
      </div>

      <div aria-live="polite" className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <Avatar src={artwork(`${collection.name} avatar`)} name={collection.name} size="lg" shape="square" />
            <div className="flex flex-col gap-1">
              <h2 className="flex items-center gap-2 text-heading-1 text-inverse">
                {collection.name}
                {collection.verified && <BadgeCheck role="img" aria-label="Verified" className="size-6" />}
              </h2>
              <p className="text-body-small text-inverse/80">By {collection.creator}</p>
            </div>
          </div>
          <StatGroup inverse>
            <Stat label="Floor price" value={formatEth(collection.floor)} />
            <Stat label="Items" value={collection.items.toLocaleString('en-US')} />
            <Stat label="Total volume" value={formatCompactEth(collection.volume)} />
            <Stat label="Listed" value={`${collection.listed}%`} />
          </StatGroup>
        </div>
        <div className="hidden gap-3 lg:flex">
          {[1, 2, 3].map((number) => (
            <img
              key={number}
              src={artwork(`${collection.name} #${number}`)}
              alt=""
              className="size-24 rounded-lg border-2 border-white/20 object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection, emphasizeChange = false }: { collection: Collection; emphasizeChange?: boolean }) {
  return (
    <MediaCard
      image={artwork(collection.name)}
      title={collection.name}
      subtitle={`By ${collection.creator}`}
      href="#"
      meta={
        <>
          <span className="flex flex-col">
            <span className="text-caption text-subtle">Floor</span>
            <span className="whitespace-nowrap tabular-nums">{formatEth(collection.floor)}</span>
          </span>
          <Delta value={collection.change} className={emphasizeChange ? 'text-body-default' : undefined} />
        </>
      }
    />
  );
}

const CARD_GRID = 'grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4';

type Range = '1h' | '1d' | '7d' | '30d';
const RANGE_FACTOR: Record<Range, number> = { '1h': 0.18, '1d': 1, '7d': 2.6, '30d': 4.3 };

function StatsPanel() {
  const [kind, setKind] = useState<'nfts' | 'tokens'>('nfts');
  const [range, setRange] = useState<Range>('1d');
  const factor = RANGE_FACTOR[range];
  const rows =
    kind === 'nfts'
      ? [...COLLECTIONS]
          .sort((a, b) => b.volume - a.volume)
          .map((item) => ({ name: item.name, value: formatEth(item.floor), change: item.change * factor, square: true, seed: item.name }))
      : TOKENS.map((item) => ({ name: item.name, value: formatUsd(item.price), change: item.change * factor, square: false, seed: item.symbol }));

  return (
    <aside
      aria-label="Top collections and tokens"
      className="sticky top-16 hidden h-[calc(100vh-4rem)] w-90 shrink-0 flex-col gap-4 overflow-y-auto border-l border-default bg-surface p-6 xl:flex"
    >
      <div className="flex items-center justify-between gap-2">
        <SegmentedControl
          label="Asset type"
          size="sm"
          value={kind}
          onChange={setKind}
          options={[
            { value: 'nfts', label: 'NFTs' },
            { value: 'tokens', label: 'Tokens' },
          ]}
        />
        <SegmentedControl
          label="Time range"
          size="sm"
          value={range}
          onChange={setRange}
          options={(['1h', '1d', '7d', '30d'] as const).map((value) => ({ value, label: value }))}
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-caption tracking-wide text-subtle uppercase">
            <th className="pb-2 text-left font-normal">{kind === 'nfts' ? 'Collection' : 'Token'}</th>
            <th className="pb-2 text-right font-normal">{kind === 'nfts' ? 'Floor' : 'Price'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.name}>
              <td className="py-1.5 pr-2">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)"
                >
                  <span className="w-5 text-caption text-subtle tabular-nums">{rowIndex + 1}</span>
                  <Avatar src={artwork(row.seed)} size="md" shape={row.square ? 'square' : 'circle'} />
                  <span className="truncate text-body-small font-semibold text-default">{row.name}</span>
                </a>
              </td>
              <td className="py-1.5 text-right">
                <span className="flex flex-col items-end">
                  <span className="text-body-small whitespace-nowrap tabular-nums">{row.value}</span>
                  <Delta value={row.change} className="text-caption" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}

export function Marketplace() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [chain, setChain] = useState<(typeof CHAINS)[number]>('All chains');
  const featured = COLLECTIONS.filter(
    (item) => (category === 'All' || item.category === category) && (chain === 'All chains' || item.chain === chain),
  ).slice(0, 5);
  const movers = [...COLLECTIONS].sort((a, b) => b.change - a.change).slice(0, 5);

  return (
    <div className="flex min-h-screen bg-canvas text-default">
      <NavRail />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <div className="flex min-w-0 flex-1">
          <main className="flex min-w-0 flex-1 flex-col gap-10 px-6 py-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
                {CATEGORIES.map((item) => (
                  <Chip key={item} selected={item === category} onClick={() => setCategory(item)}>
                    {item}
                  </Chip>
                ))}
              </div>
              <span aria-hidden className="mx-2 h-6 w-px bg-slate-200" />
              <div role="group" aria-label="Chain" className="flex flex-wrap gap-2">
                {CHAINS.map((item) => (
                  <Chip key={item} selected={item === chain} onClick={() => setChain(item)}>
                    {item}
                  </Chip>
                ))}
              </div>
            </div>

            <Hero />

            <Section title="Trending tokens" subtitle="Tokens with momentum today">
              <ul className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
                {TOKENS.map((token) => (
                  <li key={token.symbol} className="w-60 shrink-0 snap-start">
                    <a
                      href="#"
                      className="flex items-center gap-3 rounded-lg border border-default bg-surface p-3 transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focus)"
                    >
                      <Avatar src={artwork(token.symbol)} size="md" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-body-small font-semibold">{token.name}</span>
                        <span className="text-caption text-subtle">{token.symbol}</span>
                      </span>
                      <span className="flex flex-col items-end">
                        <span className="text-body-small tabular-nums">{formatUsd(token.price)}</span>
                        <Delta value={token.change} className="text-caption" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Featured collections" subtitle="This week's curated collections">
              {featured.length > 0 ? (
                <div className={CARD_GRID}>
                  {featured.map((collection) => (
                    <CollectionCard key={collection.name} collection={collection} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No collections here yet"
                  description={`Nothing matches ${category === 'All' ? '' : `${category} on `}${chain}. Try another filter.`}
                  icon={<Search strokeWidth={1.75} />}
                  action={
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCategory('All');
                        setChain('All chains');
                      }}
                    >
                      Clear filters
                    </Button>
                  }
                  className="py-12"
                />
              )}
            </Section>

            <Section title="Featured drops" subtitle="This week's live and upcoming drops">
              <div className={CARD_GRID}>
                {DROPS.map((drop) => (
                  <MediaCard
                    key={drop.name}
                    image={artwork(drop.name)}
                    title={drop.name}
                    subtitle={`By ${drop.creator}`}
                    href="#"
                    badge={
                      drop.status === 'live' ? (
                        <Badge tone="success" dot>
                          Minting now
                        </Badge>
                      ) : (
                        <Badge tone="neutral">Upcoming</Badge>
                      )
                    }
                    meta={
                      <>
                        <span className="text-caption text-subtle">Mint price</span>
                        <span className="tabular-nums">{formatEth(drop.price)}</span>
                      </>
                    }
                  />
                ))}
              </div>
            </Section>

            <Section title="Top movers today" subtitle="Largest floor price change in the past day">
              <div className={CARD_GRID}>
                {movers.map((collection) => (
                  <CollectionCard key={collection.name} collection={collection} emphasizeChange />
                ))}
              </div>
            </Section>
          </main>
          <StatsPanel />
        </div>
      </div>
    </div>
  );
}
