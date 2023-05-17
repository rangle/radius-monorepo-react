# Design Token Types

Date: 2023-05-01

## Status

Active

## Context

We use our own import tool to generate styles and documentation directly from the Token Studio exported file. However, when building components, we need a way to ensure developers will prefer using the values of these tokens to hardcoded CSS values whenever possible. Also, since designers will be pushing new versions of the token file to Github, we need a convenient way to identify whether components will break due to changes in the token structure.

## Decision

### Summary

Whenever tokens change, our importer will generate _typescript types_ representing all tokens in the Design System. Developers will use these types to select values for their components -- essentially avoiding any need for them to know the exact value of each token. Also, a file with constants will be generated to allow them to select these tokens by using the same structure the Designers use in Figma. The constant file exported, however, will contain only the names of CSS Variables, not their values.

### Details

The [/library/foundations] package is responsible for transforming the tokens pushed from [Token Studio for Figma] into the file `tokens.json`. Currently the importer only supports tokens exported as a single file.

The importer will then generate a versioned file in [/library/foundations/generated] containing detailed data about all tokens and their layers, and expandin Typography tokens in case they are not already expanded by Token Studio.

From this file, a simple template [/library/foundations/scripts/templates/token-types.template.ts] is used to generate types that will be used by the components.

This template generates three kinds of Typescript Types: _token lists_, _token filters_ and _token utilities_.

**Token lists** are discriminated unions of all tokens from a specific layer. In this particular implementation, all tokens are supposed to be used as CSS Variables, so the lists will contain only the variable names.

Ex.:

```typescript
export type BreakpointMobileLayerTokens =
  | '--spacing-semantic-theme-actions-horizontal-gap'
  | '--spacing-semantic-theme-actions-vertical-padding'
  | '--spacing-semantic-theme-actions-horizontal-padding'
  | '--spacing-semantic-theme-containment-vertical-padding';
// ...
```

**Token filters** are types capable of expressing certain types of tokens by narrowing their type and subject. This way you can refer to a token that is a _Component_ token of type _color_ to limit the type of token that can be passed into your `color` property. You can even narrow it to the specific component by using the subject-specific types.

Ex.:

```typescript
import {
  RadiusSemanticTokens,
  RadiusButtonTokens,
} from '@rangle/radius-foundations';

type MyProps = {
  color: RadiusSemanticTokens<'color'>;
  gap: RadiusButtonTokens<'spacing'>;
};
```

Lastly, **Token utilities** are types that add some convenience to the use of these types, allowing the syntax to be more stable. They also add the possibility for developers to add custom CSS to their component properties if necessary.

Ex.:

```typescript
import { CSSProp, RadiusButtonTokens } from '@rangle/radius-foundations';

type MyProps = {
  color: CSSProp<'color'>;
  gap: CSSProp<RadiusButtonTokens<'spacing'>>;
  labelSize: CSSProp<'fontSize'>;
};

const MyButton : React.FC<MyProps> = ...

return (
  <MyButton
    color={'--color-semantic-theme-actions-default-secondary-background'}
    gap={'--spacing-component-button-gap'}
    labelSize={{ css: '2rem' }}
  />
```

## Alternatives Considered

The other alternative -- exporting a file with tokens and values as a theme object -- has the inconvenience of requiring a rebuild of all components for any changes to tokens to be effective. It also requires a re-render of the components every time a token value or context changes. This alternative also negates some of the benefits of having a separate library for generating the styles of the Design System -- by tightly coupling the contents of the tokens with the components.

## Consequences

Token types not only help streamline the developer experience by providing autocomplete and instant validation that matches the right token types to the right places, they also provide an important connection between the contract established by Design and the code. Breaking changes can be detected easily and changes can even be made automatically throughout the codebase.

Another important consequence of the approach is that the Design now controls more of the appearance of the Design System, without the need to involve developers. This means they can be free to experiment using their tools, and see the consequences of this experimentation live if pipelines are configured to support this.

We also expect a slightly better performance as a consequence of this approach, as it requires less component rendering to make changes. The effect might be negligible in most cases, but can be helpful in complex scenarios.

## Considerations

We are currently using token types containing the token variable _names_ and not their values. We belive this is beneficial to the overall architecture, but we can envision scenarios where this would not be possible. It is important that we keep evaluating these opportunities so we can allow values to be available in a reasonable way in the future, but we want to avoid doing this until we find a scenario that can only be resoved by adding this dependency to the components.
