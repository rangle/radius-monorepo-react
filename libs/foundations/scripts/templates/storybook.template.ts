import {
  TokenLayer,
  TokenLayers,
  TokenOutput,
} from '../lib/token-parser.types';

// for debug purposes
// import * as data from '../../generated/token-layers-1.0.1.json';

// replace curly brackets with their escaped version
const escapeJSXValue = (value: string) =>
  value.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

const renderLayerDescription = (layer: TokenLayer | undefined) => {
  if (!layer) return '';
  const { name, parameters } = layer;
  const parameterNames = Object.keys(parameters);
  const description = parameters.description ?? '';
  if (parameterNames.length === 0)
    return `
- \`static layer\` **[${name}](#${name})** 

    ${description}
      `;
  return `
- \`dynamic layer\` **[${name}](#${name})**

    *parameters*: ${parameterNames
      .filter((name) => name !== 'description')
      .join(', ')}
    ${description}
    `;
};

const HEADER = `
import {
    Meta,
    Title,
    Subtitle,
    Story,
    ColorPalette,
    ColorItem,
    Typeset,
  } from '@storybook/addon-docs';
  import { PropsTable } from '@storybook/components';

<Meta
  title="Token Documentation"
  decorators={[
    (Story) => (
      <div style={{ marginBottom: '4rem', marginTop: '1rem' }}>
        <Story />
      </div>
    ),
  ]}
/>`;

const LAYER_PREFIX = `
# Layer Definition

This is a list of all the layers for a project. Each layer is classified as either _static_ or _dynamic_, based on its *parameters*. They might also have descriptions added by the design team.
`;

const TOKEN_PREFIX = `
# Design Tokens 
`;

const variableTypes = [
  'color',
  'typography',
  'spacing',
  'borderRadius',
  'boxShadow',
  'opacity',
  'borderWidth',
  'fontFamilies',
  'lineHeights',
  'fontWeights',
  'fontSizes',
  'letterSpacing',
  'paragraphSpacing',
  'textCase',
  'textDecoration',
];

const reduceArrayByTokenNamePrefix = (
  acc: ReadonlyArray<{ prefix: string; values: TokenOutput[] }>,
  token: TokenOutput
) => {
  const lastSegment = token.key.split('-').pop();
  const prefix = token.key.replace(`-${lastSegment}`, '');

  const existingPrefix = acc.find((item) => item.prefix === prefix) ?? {
    prefix,
    values: [],
  };

  return [
    ...acc.filter((item) => item.prefix !== prefix),
    {
      ...existingPrefix,
      values: [...existingPrefix.values, token],
    },
  ];
};

const renderLayerVariables = ({ name, variables }: TokenLayer) => {
  const variablesByType = variableTypes.reduce((acc, type) => {
    const typeVariables = variables.filter(
      (variable) => variable.type === type
    );
    return {
      ...acc,
      [type]: typeVariables,
    };
  }, {} as Record<string, TokenOutput[]>);

  const { color, typography, ...rest } = variablesByType;

  const colorPallete = color.reduce(reduceArrayByTokenNamePrefix, []);

  const colorVariables = `

  ## ${name} Color Variables

<ColorPalette>${colorPallete
    .map(
      ({ prefix, values }) => `
    <ColorItem
      title="${prefix}"
      colors={${JSON.stringify(
        values.reduce(
          (acc, { name, value }) => ({
            ...acc,
            [name]: value,
          }),
          {}
        )
      )}}
    />`
    )
    .join('')}
</ColorPalette>
    `;

  const typographyVariables = `

## ${name} Typography Variables

<table>
<thead>
  <tr>
    <th>Token</th>
    <th>Value</th>
  </tr>
</thead>
<tbody>${typography
    .map(
      ({ key, value }) => `
      <tr>
        <td>${key}</td>
        <td>${escapeJSXValue(value)}</td>
      </tr>`
    )
    .join('')}
  </tbody>
  </table>
  `;

  const restVariables = Object.keys(rest)
    .map((type) => {
      const typeVariables = rest[type];
      if (typeVariables.length === 0) return '';
      return `

### ${name} ${type} Variables

<table> 
<thead>         
    <tr>
        <th>Token</th>
        <th>Value</th>
    </tr>
</thead>
<tbody>${typeVariables
        .map(
          ({ key, value }) => `
    <tr>
        <td>${key}</td>
        <td>${escapeJSXValue(value)}</td>   
    </tr>`
        )
        .join('')}
</tbody>
</table>
    `;
    })
    .join('');

  // TODO: values starting with `--` are not being generated correctly and are therefore not being displayed correctly.
  // As a workaround, layers containing these variables have been temporarily excluded from generation.
  return name === 'components--components' ||
    name === 'mode--light' ||
    name === 'mode--dark' ||
    name.startsWith('breakpoint')
    ? ''
    : `
  # ${name}
    ${colorVariables}
    ${name !== 'halloweenevent--saddles' ? typographyVariables : ''}
    ${restVariables}
    `;
};

export const renderStorybookStory = ({ order, layers }: TokenLayers) => {
  const layerMap = layers.reduce((acc, layer) => {
    acc[layer.name] = layer;
    return acc;
  }, {} as Record<string, TokenLayer>);

  const layerDocumentation = order.map((layerName) =>
    renderLayerDescription(layerMap[layerName])
  );

  const tokenDocumentation = order.map((layerName) =>
    renderLayerVariables(layerMap[layerName])
  );

  return Buffer.from(
    [
      HEADER,
      LAYER_PREFIX,
      ...layerDocumentation,
      TOKEN_PREFIX,
      ...tokenDocumentation,
    ].join('\n')
  );
};

// for debug purposes
// const story = renderStorybookStory(data as TokenLayers);
// console.log(story.toString());