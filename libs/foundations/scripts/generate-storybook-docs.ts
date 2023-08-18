import {writeFile, readFile} from 'fs/promises';
import {
    TokenLayer,
    TokenLayers,
    TokenOutput,
} from './lib/token-parser.types';
import {parseData} from "./lib/token-parser";

const STORYBOOK_DOCS_PATH = './src/generated';

// replace curly brackets with their escaped version
const escapeJSXValue = (value: string) =>
    value.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

const renderLayerDescription = (layer: TokenLayer | undefined) => {
    if (!layer) return '';
    const {name, parameters} = layer;
    const parameterNames = Object.keys(parameters);
    const description = parameters.description ?? '';
    if (parameterNames.length === 0)
        return `
- \`static layer\` **[${name}](?path=/docs/about-token-documentation-${name.replace('--', '-')}-design-tokens--docs)** 

    ${description}
      `;
    return `
- \`dynamic layer\` **[${name}](?path=/docs/about-token-documentation-${name.replace('--', '-')}-design-tokens--docs)**

    *parameters*: ${parameterNames
        .filter((name) => name !== 'description')
        .join(', ')}
    ${description}
    `;
};

const layerHeader = (storyName: string) =>  {
    return `
import {
    Meta,
    Story,
  } from '@storybook/addon-docs';

<Meta
  title="Token Documentation/${storyName}"
  decorators={[
    (Story) => (
      <div style={{ marginBottom: '4rem', marginTop: '1rem' }}>
        <Story />
      </div>
    ),
  ]}
/>
`;
}

const LAYER_PREFIX = `
# Layer Definition

This is a list of all the layers for a project. Each layer is classified as either _static_ or _dynamic_, based on its *parameters*. They might also have descriptions added by the design team.
`;

const writeLayerDefinitions = async (fileName: string, storyName: string, order: string[], layers:TokenLayer[], layerMap) => {

    const layerDocumentation = order.map((layerName) =>
        renderLayerDescription(layerMap[layerName])
    );

    const layerDefinitions = [
            layerHeader(storyName),
            LAYER_PREFIX,
            ...layerDocumentation,
    ].join('\n');

    try {
        console.info(`SAVING ${fileName}`);
        await writeFile(fileName, layerDefinitions);
    } catch (err) {
        console.log(err);
    }
}

const tokenHeader = (layerName: string) =>  {
    return `
import {
    Meta,
    Title,
    Subtitle,
    Story,
    Typeset,
  } from '@storybook/addon-docs';
  import { PropsTable } from '@storybook/components';

<Meta
  title="Token Documentation/${layerName} Design Tokens"
  decorators={[
    (Story) => (
      <div style={{ marginBottom: '4rem', marginTop: '1rem' }}>
        <Story />
      </div>
    ),
  ]}
/>
# ${layerName} Design Tokens 
`
};

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

const colorItemDisplay = (values) => {
    return values.map(({name, value}) => {
        return `
            <div style={{ display: 'flex', gap: '1rem'}}>
                <div style={{ backgroundColor: '${value}', width: '200px', height: '50px', border: '1px solid #DDDDDD', flexShrink: '0' }}></div>
                <div style={{ alignSelf: 'center'}}><div>${name}</div><div>${value}</div></div>
            </div>    
    `}).join('\n')
}

const colorPaletteDisplay = (colorPalette) => {
    return colorPalette.map(
        ({prefix, values}) => `
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontWeight: 'bold' }}>${prefix}</div>
           ${colorItemDisplay(values)}
        </div>  
    `).join('\n');
}

const renderLayerVariables = (name, variables) => {
    const variablesByType = variableTypes.reduce((acc, type) => {
        const typeVariables = variables.filter(
            (variable) => variable.type === type
        );
        return {
            ...acc,
            [type]: typeVariables,
        };
    }, {} as Record<string, TokenOutput[]>);

    const {color, typography, ...rest} = variablesByType;

    const colorPalette = color.reduce(reduceArrayByTokenNamePrefix, []);

    const colorVariables = colorPalette.length > 0 ? `

  ## ${name} Color Variables
  
  ${colorPalette.map(({prefix, values}) => `
    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <div style={{ fontWeight: 'bold' }}>${prefix}</div>
       ${colorItemDisplay(values)}
    </div>`).join('\n')}
  ` : '';

  const typographyVariables = typography.length > 0 ? `

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
            ({key, value}) => `
      <tr>
        <td>${key}</td>
        <td>${escapeJSXValue(value)}</td>
      </tr>`
        )
        .join('')}
  </tbody>
  </table>
` : '';

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
                    ({key, value}) => `
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

    return colorVariables.length || typographyVariables.length || restVariables.length ? `
  # ${name}
    ${colorVariables}
    ${typographyVariables}
    ${restVariables}
    ` : '';
};

const baseTokenDefinitions = (name: string, variables) => {
    const layerVariables = renderLayerVariables(name, variables);
    return [
        tokenHeader(name),
        layerVariables
    ].join('\n');
}

const writeTokenDefinitions = async (name: string, baseTokenDefinitions: string, modeDefinitions: string, fileName: string) => {
    const tokenDefinitions = [
        tokenHeader(name),
        baseTokenDefinitions,
        modeDefinitions
    ].join('\n');

    try {
        console.info(`SAVING ${fileName}`);
        await writeFile(fileName, tokenDefinitions);
    } catch (err) {
        console.log(err);
    }
}

async function readTokenData(fileName: string) {
    try {
        console.info(`READING TOKENS FROM ${fileName}`);
        return(await readFile(fileName));
    } catch (err) {
        console.log(`Error reading tokens, ${err}`);
        process.exit(1);
    }
}

const [, , tokenFileName] = process.argv;
if (!tokenFileName) {
    console.error(
        `Usage:  ts-node ${__filename} <tokenFileName>`
    );
    process.exit(1);
}

const fileIndex = (fileCount: number) => {
    return fileCount < 10 ?
        fileCount.toString().padStart(2, '0') :
        fileCount.toString();
}

readTokenData(tokenFileName).then(tokenFile => {
    const {order, layers}: TokenLayers = parseData(tokenFile);
    const layerMap = layers.reduce((acc, layer) => {
        acc[layer.name] = layer;
        return acc;
    }, {} as Record<string, TokenLayer>);
    let fileCount = 4;
    writeLayerDefinitions(`${STORYBOOK_DOCS_PATH}/${fileIndex(fileCount++)}-token-layer-definitions.mdx`, 'Layer Definition', order, layers, layerMap);

    [ "core", "brand--photostop", "brand--saddles", "halloweenevent--saddles"].map((layerName) => {
        const { name, variables }: TokenLayer = layerMap[layerName];
        const basetokenDefinitions = renderLayerVariables(name, variables);
        const valueMap = variables.reduce((map, obj) => {
            map[obj.key] = obj.value;
            return map;
        }, {});

        const modeDefinitions = ['mode--light', 'mode--dark', "breakpoint--desktop", "breakpoint--tablet",
            "breakpoint--mobile", "components--components"].map((mode) => {
            const modeVariables: TokenOutput[] = layerMap[mode].variables;
            const layerVariables = modeVariables.reduce(function(acc, variable){
                if (variable.value) {
                    const value = variable.value.replace(/[{}]/g, "");
                    const newValue = valueMap[value];
                    if (newValue) {
                        acc.push({
                            ...variable,
                            value: newValue
                        })
                   }
                }
                return acc;
            }, []);
            return (layerVariables.length > 0) ? renderLayerVariables(`${name} ${mode}`, layerVariables) : '';
        }).join('\n');

        writeTokenDefinitions(name, basetokenDefinitions, modeDefinitions, `${STORYBOOK_DOCS_PATH}/${fileIndex(fileCount++)}-${layerName}-token-definitions.mdx`);
    });
});

