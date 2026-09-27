// Builds src/styles/tokens.css (a Tailwind v4 @theme block) from the DTCG JSON files in tokens/.
import StyleDictionary from 'style-dictionary';
import { fileHeader, formattedVariables } from 'style-dictionary/utils';

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

// Typography tokens are expanded into sub-tokens, which map onto Tailwind's
// font-size modifiers: text-heading-1 sets size, line height and weight together.
const TYPE_PROPERTY = {
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
      const property = rest.pop();
      return `text-${rest.join('-')}${TYPE_PROPERTY[property] ?? `--${property}`}`;
    }
    return `${NAMESPACE[group]}-${rest.join('-')}`;
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
  expand: { include: ['typography'] },
  platforms: {
    tailwind: {
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
  },
});

await sd.buildAllPlatforms();
