# Hero Component

Date: 2023-03-07

## Status

Active

## Context

The Hero component is a full-width component that is used to display a large image with a title, eyebrow, and a call-to-action button.

## Decision

The Hero component is built with the following Radius components:

- `RadiusAutoLayout` component: a wrapper component that handles the responsive layout for the Hero component.
- `Typography` component: a component that lets us apply styles and semantics to the title text and eyebrow text.
- `RadiusButton` component: used for the call-to-action button. The button is an `a` tag styled as a button that takes the user to the link specified in the `href` attribute.

The Hero component has a dark background in dark mode and a light background in light mode. The color change is handled by the design context automatically.

The Hero component also has a responsive layout that changes the layout of the component based on the screen size. The button size and font size scale based on the screen size.

## Consequences

The Hero component is a good example of how we can reuse other Radius atomic components to build more complex components. It also shows how we take advantage of the design context to build components that are compatible with light and dark themes, as well as responsive layouts.

Ideally the Hero component requires minimal CSS to be styled - properties such as paddings and margins should be controlled by the design system spacing tokens. That way, when the screen size changes, the design context takes over and overrides the value of the spacing tokens to make the component responsive.

The alpha version of the Hero component still uses media queries to change the layout of the component based on the screen size. In the future, we should be able to use the `RadiusAutoLayout` component to handle the responsive layout of the component. When the spacing tokens are updated in the design context, we should be able to remove the media queries from the Hero component.
