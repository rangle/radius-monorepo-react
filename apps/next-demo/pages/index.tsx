import React, { useContext } from 'react';
import { RadiusAutoLayout } from '@rangle/radius-react-core-components';
import {
  RadiusHero,
  RadiusImageTextList,
  RadiusFooter,
  RadiusButton,
} from '@rangle/radius-react-examples';
import {
  Twitter,
  LinkedIn,
  Instagram,
  Youtube,
  ArrowRight,
} from '@rangle/radius-foundations';
import { radiusTokens } from '@rangle/radius-foundations';
import { css } from '@emotion/css';
import { ThemeContext } from '../shared/contexts';

/** Temp helper to fix icon type collision due to the way they are exported */
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function Index() {
  /** This should be integrated into a Page layout component, currently a WIP in design */
  const pageMaxWidth = 1280;
  const theme = useContext(ThemeContext);

  return (
    <RadiusAutoLayout
      direction="vertical"
      space={radiusTokens.component.spacing.layouts.gap.vertical}
      fill={radiusTokens.component.color.layout.background}
      width="fill-parent"
      id="content"
    >
      {/* Nav Wrapper */}

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
                src={`/brand/${theme}/assets/semantic.image.hero.headerImage.webp`}
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
              background: url(/brand/${theme}/assets/semantic.image.hero.backgroundImage.webp);
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
                src: `/brand/${theme}/assets/semantic.image.largeImageTextItem.image01.webp`,
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
                src: `/brand/${theme}/assets/semantic.image.largeImageTextItem.image02.webp`,
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
                src: `/brand/${theme}/assets/semantic.image.largeImageTextItem.image03.webp`,
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
                src: `/brand/${theme}/assets/semantic.image.smallImageTextItem.image01.webp`,
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/{--brandOrEvent}/{--brand}/assets/semantic.image.smallImageTextItem.image01.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                src: `/brand/${theme}/assets/semantic.image.smallImageTextItem.image02.webp`,
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/{--brandOrEvent}/{--brand}/assets/semantic.image.smallImageTextItem.image02.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                src: `/brand/${theme}/assets/semantic.image.smallImageTextItem.image03.webp`,
                // @ts-expect-error needed for brand-switching demo
                ['data-radius-watch-token-changes']: true,
                ['data-radius-replace-value']:
                  '/{--brandOrEvent}/{--brand}/assets/semantic.image.smallImageTextItem.image03.webp',
              },
              {
                alt: 'Descriptive text',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
                src: `/brand/${theme}/assets/semantic.image.smallImageTextItem.image04.webp`,
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
              href="#content"
              data-radius-watch-token-changes
              data-radius-target-selector="img"
              data-radius-target-attribute="src"
              data-radius-replace-value="/brand/{--brand}/assets/secondary-logo-{--mode}.svg"
            >
              <img
                alt={`${theme} logo`}
                src={`/brand/${theme}/assets/secondary-logo-light-mode.svg`}
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
          copyright="© Rangle.io, 2024.  All rights reserved."
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
