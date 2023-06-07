import React, { ComponentType, SVGProps } from 'react';
import Github from '../../../../library/foundations/generated/icons/github';
import Figma from '../../../../library/foundations/generated/icons/figma';
import EventNote from '../../../../library/foundations/generated/icons/event-note';
// import Github from '@rangle/radius-foundations/generated/icons/github.tsx';
// import Figma from '@rangle/radius-foundations/generated/icons/figma';
// import EventNote from '@rangle/radius-foundations/generated/icons/event-note';
import {
  RadiusNav,
  RadiusHero,
  RadiusImageTextList,
} from '@rangle/radius-react-core-components';
import { Typography } from '@rangle/radius-react-core-components';
import { RadiusAutoLayout } from '@rangle/radius-react-core-components';
import { RadiusLinkIcon } from '@rangle/radius-react-core-components/components/link-icon';
// import PrimaryLogoLight from '@rangle/radius-foundations/generated/brands/radius/assets/primary-logo-light.svg';
export default function Index() {
  return (
    <>
      <RadiusNav
        linkIcons={[
          {
            'aria-label': 'See source on Github',
            href: 'https://github.com/rangle/radius-monorepo-react',
            // I think they are currently using different instances of react types
            icon: Github as ComponentType<SVGProps<SVGSVGElement>>,
          },
          {
            'aria-label': 'See designs on Figma',
            href: 'https://www.figma.com/file/zpDGiKGaY35SEnfKB2uzeZ/Radius-Demo-Site?type=design&t=GqzqcLwssKZzV8o7-0',
            icon: Figma as ComponentType<SVGProps<SVGSVGElement>>,
          },
          {
            'aria-label': 'Book a demo',
            href: '#',
            icon: EventNote as ComponentType<SVGProps<SVGSVGElement>>,
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
            icon: Github as ComponentType<SVGProps<SVGSVGElement>>,
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
      >
        <RadiusHero
          header="Header"
          eyebrow="Eyebrow"
          buttonLabel="Action"
          imageSrc="https://i.ibb.co/NjX1C6b/roger-van-de-kimmenade-93-Cz5t2-WP5-I-unsplash.jpg"
          imageAlt="Saddles Logo"
          ctaUrl="/posts"
        />
      </span>
      <RadiusImageTextList
        items={[
          {
            alt: 'Descriptive text',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
            header: 'Header',
            headingLevel: 'h2',
            src: 'https://i.ibb.co/MS0V7Zk/elisa-pitkanen-Z9-FZ6hko-k-unsplash.jpg',
            // ['data-radius-watch-token-changes']: true,
            // ['data-radius-token']:
            //   '--asset-component-image-large-image-text-item-image01',
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
    </>
  );
}
