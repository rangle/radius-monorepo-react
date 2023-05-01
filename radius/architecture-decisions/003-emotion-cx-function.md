# Title

Date: 2023-03-08

## Status

Active

## Context

When applying custom classes to a component which already had a class applied (eg. AutoLayout), the new classes wouldn't necessarily generate in the correct order and wouldn't override the default classes as intended.

## Decision

We replaced our classNames implementation with the `cx` function from `@emotion/css`, which detects emotion generated class names and ensures styles are overwritten in the correct order (from left to right).

## Alternatives Considered

A similar solution using the `css` function from `@emotion/react` was considered, however it required additional refactoring so was abandoned in favour of the `cx` solution. 

See emotion composition docs for more info: https://emotion.sh/docs/composition
Solution to JSX import source issue with this method: https://emotion.sh/docs/css-prop#jsx-pragma

## Consequences

CSS properties are now overwritten as expected (in the order their classes are passed to the cx function).

## Considerations

Relevant emotion docs: https://emotion.sh/docs/@emotion/css#cx