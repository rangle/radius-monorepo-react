import React from 'react';
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
} from '../../../../library/foundations/generated/icons';
import { RadiusAutoLayout } from '@rangle/radius-react-core-components';

/** Temp helper to fix icon type collision due to the way they are exported */
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
// import PrimaryLogoLight from '@rangle/radius-foundations/generated/brands/radius/assets/primary-logo-light.svg';
export default function Index() {
  return (
    <RadiusAutoLayout
      direction="vertical"
      space={{ css: '40px' }}
      width="fill-parent"
    >
      <RadiusAutoLayout
        direction="vertical"
        space={{ css: '0' }}
        width="fill-parent"
      >
        <RadiusNav
          linkIcons={[
            {
              'aria-label': 'See source on Github',
              href: 'https://github.com/rangle/radius-monorepo-react',
              // I think they are currently using different instances of react types
              icon: Github as IconType,
            },
            {
              'aria-label': 'See designs on Figma',
              href: 'https://www.figma.com/file/zpDGiKGaY35SEnfKB2uzeZ/Radius-Demo-Site?type=design&t=GqzqcLwssKZzV8o7-0',
              icon: Figma as IconType,
            },
            {
              'aria-label': 'Book a demo',
              href: '#',
              icon: EventNote as IconType,
            },
          ]}
          logos={
            <>
              <a href="#">
                <img
                  alt="Saddles logo"
                  src="https://i.ibb.co/HCx9ZH8/saddleslightprimarynew.png"
                  style={{
                    height: 'var(--sizing-component-navigation-primary-logo)',
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
            {
              href: '#',
              label: 'Menu Item 4',
            },
          ]}
          socials={[
            {
              'aria-label': 'Descriptive text',
              href: '#',
              icon: Github as IconType,
            },
          ]}
          data-radius-watch-token-changes
          data-radius-target-selector="img"
          data-radius-target-attribute="src"
          data-radius-token="--asset-component-image-navigation-logo"
        />
        <span
          data-radius-watch-token-changes
          data-radius-token="--asset-component-image-hero-header"
          style={{
            width: '100%',
          }}
        >
          <RadiusHero
            header="Header"
            eyebrow="Eyebrow"
            buttonLabel="Action"
            imageSrc="https://i.ibb.co/NjX1C6b/roger-van-de-kimmenade-93-Cz5t2-WP5-I-unsplash.jpg"
            imageAlt="Image Alt"
            ctaUrl="/posts"
          />
        </span>
      </RadiusAutoLayout>
      <RadiusAutoLayout as="main" direction="vertical">
        <RadiusImageTextList
          items={[
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              header: 'Header',
              headingLevel: 'h2',
              src: 'https://i.ibb.co/MS0V7Zk/elisa-pitkanen-Z9-FZ6hko-k-unsplash.jpg',
              // @ts-expect-error needed for brand-switching demo
              ['data-radius-watch-token-changes']: true,
              ['data-radius-token']:
                '--asset-component-image-large-image-text-item-image01',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              header: 'Header',
              headingLevel: 'h2',
              src: 'https://i.ibb.co/z77WsVJ/taylor-a7i-PP9-Ia-S8-unsplash.jpg',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              header: 'Header',
              headingLevel: 'h2',
              src: 'https://i.ibb.co/H7KyxSJ/tengis-galamez-u-JYpt-Y1z-OYY-unsplash.jpg',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              header: 'Header',
              headingLevel: 'h2',
              src: 'https://i.ibb.co/9yk9QRh/philippe-oursel-3v7qofrk-MXk-unsplash.jpg',
            },
          ]}
          variant="large"
        />
        <RadiusImageTextList
          items={[
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              src: 'https://i.ibb.co/qNqwthW/saddle1.jpg',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              src: 'https://i.ibb.co/qNqwthW/saddle2.jpg',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              src: 'https://i.ibb.co/qNqwthW/saddle3.jpg',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              src: 'https://i.ibb.co/qNqwthW/saddle4.jpg',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              src: 'https://i.ibb.co/qNqwthW/saddle5.jpg',
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              src: 'https://i.ibb.co/qNqwthW/saddle6.jpg',
            },
          ]}
          variant="small"
        />
      </RadiusAutoLayout>

      <RadiusFooter
        logo={
          <a href="#">
            <img
              alt="Saddles logo"
              src="https://i.ibb.co/s9bD4G0/darkmodesaddlessecondary.png"
              style={{
                height: 'var(--sizing-component-navigation-primary-logo)',
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
          { children: 'Sign up', href: '#', iconRight: ArrowRight as IconType },
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
        }}
      />
    </RadiusAutoLayout>
  );
}
