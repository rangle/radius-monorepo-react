import React, { useState } from 'react';
import {
  RadiusNav,
  RadiusHero,
  RadiusImageTextList,
  RadiusFooter,
} from '@rangle/radius-react-core-components';
import {
  Github,
  ArrowRight,
  Twitter,
  LinkedIn,
  Instagram,
  Youtube,
  LightMode,
  DarkMode,
} from '../../../../library/foundations/generated/icons';
import {
  RadiusAutoLayout,
  RadiusButton,
} from '@rangle/radius-react-core-components';
export default function Index() {
  const [mode, setMode] = useState<'light-mode' | 'dark-mode'>('light-mode');

  const toggleMode = () => {
    setMode(mode === 'light-mode' ? 'dark-mode' : 'light-mode');
    const modeElement = document.querySelector(`.${mode}`);
    modeElement?.classList.remove(mode);
    modeElement?.classList.add(
      mode === 'light-mode' ? 'dark-mode' : 'light-mode'
    );
  };

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
              'aria-label': 'Descriptive text',
              href: '#',
              icon: () => {},
            },
            {
              'aria-label': 'Descriptive text',
              href: '#',
              icon: () => {},
            },
            {
              'aria-label': 'Descriptive text',
              href: '#',
              icon: () => {},
            },
            {
              'aria-label': 'Light/Dark Mode Toggle',
              as: 'button',
              onClick: toggleMode,
              icon: mode === 'light-mode' ? LightMode : DarkMode,
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
              icon: Github,
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
            header="header"
            eyebrow="Eyebrow"
            buttonLabel="Action"
            imageSrc="https://i.ibb.co/NjX1C6b/roger-van-de-kimmenade-93-Cz5t2-WP5-I-unsplash.jpg"
            ctaUrl="/posts"
          />
        </span>
      </RadiusAutoLayout>
      <RadiusAutoLayout
        as="main"
        direction="vertical"
        padding={[0, '--spacing-component-hero-padding-horizontal']}
        width="fill-parent"
      >
        <RadiusImageTextList
          items={[
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              header: 'Header',
              headingLevel: 'h2',
              src: 'https://i.ibb.co/MS0V7Zk/elisa-pitkanen-Z9-FZ6hko-k-unsplash.jpg',
              children: (
                <RadiusButton rightIcon={ArrowRight} variant="secondary">
                  Shop Now
                </RadiusButton>
              ),
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
              children: (
                <RadiusButton rightIcon={ArrowRight} variant="secondary">
                  Shop Now
                </RadiusButton>
              ),
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              header: 'Header',
              headingLevel: 'h2',
              src: 'https://i.ibb.co/H7KyxSJ/tengis-galamez-u-JYpt-Y1z-OYY-unsplash.jpg',
              children: (
                <RadiusButton rightIcon={ArrowRight} variant="secondary">
                  Shop Now
                </RadiusButton>
              ),
            },
            {
              alt: 'Descriptive text',
              body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
              header: 'Header',
              headingLevel: 'h2',
              src: 'https://i.ibb.co/9yk9QRh/philippe-oursel-3v7qofrk-MXk-unsplash.jpg',
              children: (
                <RadiusButton rightIcon={ArrowRight} variant="secondary">
                  Shop Now
                </RadiusButton>
              ),
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
          { children: 'Design', href: '#', iconRight: ArrowRight },
          { children: 'Development', href: '#', iconRight: ArrowRight },
          { children: 'Resources', href: '#', iconRight: ArrowRight },
          { children: 'Components', href: '#', iconRight: ArrowRight },
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
          { children: 'Sign up', href: '#', iconRight: ArrowRight },
        ]}
        copyright="© Rangle.io, 2023.  All rights reserved."
        privacyPolicy={{
          children: 'Privacy Policy',
          href: '#',
        }}
        connectLinkIcons={[
          { icon: Twitter, href: '#', 'aria-label': 'Descriptive text' },
          { icon: LinkedIn, href: '#', 'aria-label': 'Descriptive text' },
          { icon: Instagram, href: '#', 'aria-label': 'Descriptive text' },
          { icon: Youtube, href: '#', 'aria-label': 'Descriptive text' },
        ]}
        connectButtonProps={{
          children: 'Get in touch',
          rightIcon: ArrowRight,
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
