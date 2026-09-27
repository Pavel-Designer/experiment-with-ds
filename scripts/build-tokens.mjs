// Builds from the DTCG JSON files in tokens/:
// - src/styles/tokens.css: a Tailwind v4 @theme block
// - src/docs/tokens.generated.json: a flat token list for the Storybook Foundations pages
import StyleDictionary from 'style-dictionary';
import { fileHeader, formattedVariables, usesReferences } from 'style-dictionary/utils';

// Semantic groups use Tailwind's per-property namespaces, so `bg.surface`
// becomes --background-color-surface and generates only the `bg-surface` utility.
const NAMESPACE = {
  color: 'color',
  bg: 'background-color',
  text: 'text-color',
  border: 'border-color',
  space: 'spacing',
  radius: 'radius',
  shadow: 'shadow',
};

// For Tailwind, typography tokens are expanded into sub-tokens, which map onto its
// font-size modifiers: text-heading-1 sets size, line height and weight together.
const TYPE_PROPERTY = {
  fontFamily: '--font-family',
  fontSize: '',
  lineHeight: '--line-height',
  fontWeight: '--font-weight',
  letterSpacing: '--letter-spacing',
};

StyleDictionary.registerTransform({
  name: 'name/tailwind',
  type: 'name',
  transform: ({ path }) => {
    const [group, ...rest] = path;
    if (group === 'font') return `font-${rest.slice(1).join('-')}`;
    if (group === 'typography') {
      // Expanded sub-tokens end in a property name; whole typography tokens don't.
      const suffix = TYPE_PROPERTY[rest.at(-1)];
      return suffix === undefined
        ? `text-${rest.join('-')}`
        : `text-${rest.slice(0, -1).join('-')}${suffix}`;
    }
    return `${NAMESPACE[group]}-${rest.join('-')}`;
  },
});

StyleDictionary.registerFormat({
  name: 'json/docs',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens.map((token) => {
      const original = token.original.$value;
      return {
        name: token.path.join('.'),
        cssVar: `--${token.name}`,
        type: token.$type,
        value: token.$value,
        alias: typeof original === 'string' && usesReferences(original) ? original.slice(1, -1) : undefined,
        description: token.$description,
      };
    });
    return `${JSON.stringify(tokens, null, 2)}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'css/tailwind-theme',
  format: async ({ dictionary, file, options }) => {
    const header = await fileHeader({ file });
    // Expanded typography sub-tokens inherit the style's description; keep it on the size line only.
    const allTokens = dictionary.allTokens.map((token) =>
      token.path[0] === 'typography' && token.path.at(-1) !== 'fontSize'
        ? { ...token, $description: undefined }
        : token,
    );
    const variables = formattedVariables({
      format: 'css',
      dictionary: { ...dictionary, allTokens },
      outputReferences: options.outputReferences,
      usesDtcg: true,
    });
    return `${header}@theme static {
  /* Drop Tailwind's default palette and scales so only Northstar tokens exist. */
  --color-*: initial;
  --text-*: initial;
  --radius-*: initial;
  --shadow-*: initial;

${variables}

  /* Base unit for sizing utilities: h-10 = 40px, size-4.5 = 18px. */
  --spacing: var(--spacing-1);
}
`;
  },
});

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  usesDtcg: true,
  platforms: {
    tailwind: {
      expand: { include: ['typography'] },
      transforms: ['name/tailwind', 'fontFamily/css', 'shadow/css/shorthand'],
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/tailwind-theme',
          // Tailwind's text-* utilities can't carry a font family; every style uses the sans stack.
          filter: (token) => !(token.path[0] === 'typography' && token.path.at(-1) === 'fontFamily'),
          options: { outputReferences: true },
        },
      ],
    },
    docs: {
      transforms: ['name/tailwind', 'fontFamily/css', 'shadow/css/shorthand'],
      buildPath: 'src/docs/',
      files: [{ destination: 'tokens.generated.json', format: 'json/docs' }],
    },
  },
});

await sd.buildAllPlatforms();
