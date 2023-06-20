import React, { useState } from 'react';
import {
  RadiusNav,
  RadiusHero,
  RadiusImageTextList,
  RadiusFooter,
} from '@rangle/radius-react-core-components';
import {
  Github,
  Figma,
  EventNote,
  ArrowRight,
  Twitter,
  LinkedIn,
  Instagram,
  Youtube,
  LightMode,
  DarkMode,
} from '../../../../library/foundations/generated/icons';
import { radiusTokens } from '../../../../library/foundations/generated/design-tokens.constants';
import {
  RadiusAutoLayout,
  RadiusButton,
} from '@rangle/radius-react-core-components';
import { css } from '@emotion/css';
import { useIsScrolled } from '../../hooks/use-is-scrolled';

/** Temp helper to fix icon type collision due to the way they are exported */
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const modes = ['dark-mode', 'light-mode'];
/** This should be integrated into a Page layout component, currently a WIP in design */
const pageMaxWidth = 1280;

export default function Index() {
  const [mode, setMode] = useState(1);
  const isScrolled = useIsScrolled();

  const toggleMode = () => {
    const modeElement = document.querySelector(`.${modes[mode]}`);
    modeElement?.classList.remove(modes[mode]);
    modeElement?.classList.add(modes[mode ^ 1]);
    setMode(mode ^ 1);
  };

  return (
    <RadiusAutoLayout
      direction="vertical"
      space={radiusTokens.component.spacing.layouts.gap.vertical}
      fill={radiusTokens.component.color.layout.background}
      width="fill-parent"
    >
      {/* Nav Wrapper */}
      <RadiusAutoLayout
        width="fill-parent"
        height="hug-contents"
        fill={radiusTokens.component.color.navigation.background}
        className={css`
          position: sticky;
          top: 0;
          margin-bottom: calc(
            var(${radiusTokens.component.spacing.layouts.gap.vertical}) * -1
          ) !important;
          box-shadow: ${isScrolled
            ? `var(${radiusTokens.component.shadow.navigation.scroll});`
            : ''};
        `}
      >
        <RadiusNav
          linkIcons={[
            {
              'aria-label': 'See source on Github',
              title: 'See source on Github',
              href: 'https://github.com/rangle/radius-monorepo-react',
              // I think they are currently using different instances of react types
              icon: Github as IconType,
            },
            {
              'aria-label': 'See designs on Figma',
              title: 'See designs on Figma',
              href: 'https://www.figma.com/file/zpDGiKGaY35SEnfKB2uzeZ/Radius-Demo-Site?type=design&t=GqzqcLwssKZzV8o7-0',
              icon: Figma as IconType,
            },
            {
              'aria-label': mode
                ? 'Switch to dark mode'
                : 'Switch to light mode',
              title: mode ? 'Switch to dark mode' : 'Switch to light mode',
              as: 'button',
              onClick: toggleMode,
              icon: (mode ? DarkMode : LightMode) as IconType,
            },
          ]}
          logos={
            <>
              <a
                href="#"
                data-radius-watch-token-changes
                data-radius-target-selector="img"
                data-radius-target-attribute="src"
                data-radius-replace-value="/brand/{--brand}/assets/primary-logo-{--mode}.svg"
              >
                <RadiusAutoLayout
                  as="img"
                  alt="Company logo"
                  src="/brand/saddles/assets/primary-logo-light-mode.svg"
                  style={{
                    height: `var(${radiusTokens.component.sizing.navigation.primaryLogo})`,
                  }}
                />
              </a>
            </>
          }
          navItems={[
            {
              href: '#',
              label: 'Menu Item 1',
              selected: true,
            },
            {
              href: '#',
              label: 'Menu Item 2',
            },
            {
              href: '#',
              label: 'Menu Item 3',
            },
          ]}
          socials={[
            {
              icon: Twitter as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
            {
              icon: LinkedIn as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
            {
              icon: Instagram as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
            {
              icon: Youtube as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
          ]}
          className={css`
            margin: 0 auto;
            max-width: ${pageMaxWidth}px;
          `}
          // TODO: shadow is now a page-level concern since we are adding wrappers
          // hasShadow={isScrolled}
        />
      </RadiusAutoLayout>
      {/* Hero and main content wrapper */}
      <RadiusAutoLayout
        direction="vertical"
        space={radiusTokens.component.spacing.layouts.gap.vertical}
        style={{
          maxWidth: pageMaxWidth,
          margin: '0 auto',
        }}
      >
        <span
          data-radius-watch-token-changes
          data-radius-target-selector="div.demo-hero"
          data-radius-target-attribute="style"
          data-radius-replace-value="background: url(/{--brandOrEvent}/{--brand}/assets/semantic.image.hero.backgroundImage.webp)"
          className={css`
            width: 100%;
          `}
        >
          <RadiusHero
            header="Header"
            eyebrow="Eyebrow"
            buttonLabel="Action"
            image={
              <RadiusAutoLayout
                as="img"
                width="fill-parent"
                height="fill-parent"
                src="/brand/saddles/assets/semantic.image.hero.headerImage.webp"
                alt="Image Description"
                className={css`
                  object-fit: cover;
                `}
              />
            }
            ctaUrl="/posts"
            imageAlignment="right"
            data-radius-watch-token-changes
            data-radius-target-selector="img"
            data-radius-target-attribute="src"
            data-radius-replace-value="/{--brandOrEvent}/{--brand}/assets/semantic.image.hero.headerImage.webp"
            className={`demo-hero ${css`
              background: url(/brand/saddles/assets/semantic.image.hero.backgroundImage.webp);
            `}`}
          />
        </span>
        <RadiusAutoLayout
          as="main"
          direction="vertical"
          padding={[0, radiusTokens.component.spacing.hero.padding.horizontal]}
          space={radiusTokens.component.spacing.layouts.gap.vertical}
          width="fill-parent"
        >
          <RadiusImageTextList
            items={[
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                header: 'Header',
                headingLevel: 'h2',
                src: '/brand/saddles/assets/semantic.image.largeImageTextItem.image01.webp',
                children: (
                  <RadiusButton
                    rightIcon={ArrowRight as IconType}
                    variant="secondary"
                  >
                    Shop Now
                  </RadiusButton>
                ),
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/brand/{--brand}/assets/semantic.image.largeImageTextItem.image01.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                header: 'Header',
                headingLevel: 'h2',
                src: '/brand/saddles/assets/semantic.image.largeImageTextItem.image02.webp',
                children: (
                  <RadiusButton
                    rightIcon={ArrowRight as IconType}
                    variant="secondary"
                  >
                    Shop Now
                  </RadiusButton>
                ),
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/brand/{--brand}/assets/semantic.image.largeImageTextItem.image02.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                header: 'Header',
                headingLevel: 'h2',
                src: '/brand/saddles/assets/semantic.image.largeImageTextItem.image03.webp',
                children: (
                  <RadiusButton
                    rightIcon={ArrowRight as IconType}
                    variant="secondary"
                  >
                    Shop Now
                  </RadiusButton>
                ),
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/brand/{--brand}/assets/semantic.image.largeImageTextItem.image03.webp',
              },
            ]}
            variant="large"
            style={{
              width: '100%',
            }}
          />
          <RadiusImageTextList
            items={[
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                src: '/brand/saddles/assets/semantic.image.smallImageTextItem.image01.webp',
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/{--brandOrEvent}/{--brand}/assets/semantic.image.smallImageTextItem.image01.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                src: '/brand/saddles/assets/semantic.image.smallImageTextItem.image02.webp',
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/{--brandOrEvent}/{--brand}/assets/semantic.image.smallImageTextItem.image02.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                src: '/brand/saddles/assets/semantic.image.smallImageTextItem.image03.webp',
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/{--brandOrEvent}/{--brand}/assets/semantic.image.smallImageTextItem.image03.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                src: '/brand/saddles/assets/semantic.image.smallImageTextItem.image04.webp',
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/{--brandOrEvent}/{--brand}/assets/semantic.image.smallImageTextItem.image04.webp',
              },
            ]}
            variant="small"
          />
        </RadiusAutoLayout>
      </RadiusAutoLayout>

      {/* Footer Wrapper */}
      <RadiusAutoLayout
        width="fill-parent"
        fill={radiusTokens.component.color.footer.background}
      >
        <RadiusFooter
          logo={
            <a
              href="#"
              data-radius-watch-token-changes
              data-radius-target-selector="img"
              data-radius-target-attribute="src"
              data-radius-replace-value="/{--brandOrEvent}/{--brand}/assets/secondary-logo-{--mode}.svg"
            >
              <img
                alt="Saddles logo"
                src="/brand/saddles/assets/secondary-logo-light-mode.svg"
                style={{
                  height: 'var(--sizing-component-navigation-secondary-logo)',
                }}
              />
            </a>
          }
          pageLinks={[
            {
              children: 'Design',
              href: '#',
              iconRight: ArrowRight as IconType,
            },
            {
              children: 'Development',
              href: '#',
              iconRight: ArrowRight as IconType,
            },
            {
              children: 'Resources',
              href: '#',
              iconRight: ArrowRight as IconType,
            },
            {
              children: 'Components',
              href: '#',
              iconRight: ArrowRight as IconType,
            },
          ]}
          inquiriesHeader="General Inquiries"
          inquiriesLinks={[
            {
              children: 'info@rangle.io',
              href: '#',
            },
            {
              children: '1 416-737-1555',
              href: '#',
            },
          ]}
          newsLetterHeader="Our newsletter"
          newsLetterLinks={[
            {
              children: 'Sign up',
              href: '#',
              iconRight: ArrowRight as IconType,
            },
          ]}
          copyright="© Rangle.io, 2023.  All rights reserved."
          privacyPolicy={{
            children: 'Privacy Policy',
            href: '#',
          }}
          connectLinkIcons={[
            {
              icon: Twitter as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
            {
              icon: LinkedIn as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
            {
              icon: Instagram as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
            {
              icon: Youtube as IconType,
              href: '#',
              'aria-label': 'Descriptive text',
            },
          ]}
          connectButtonProps={{
            children: 'Get in touch',
            rightIcon: ArrowRight as IconType,
            as: 'a',
            href: '#',
          }}
          style={{
            width: '100%',
            maxWidth: pageMaxWidth,
            margin: '0 auto',
          }}
        />
      </RadiusAutoLayout>
    </RadiusAutoLayout>
  );
}
