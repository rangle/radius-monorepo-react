import '@rangle/radius-foundations/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { ThemeContext } from '../shared/contexts';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
const cache = createCache({ key: 'next' });
import { RadiusAutoLayout } from '@rangle/radius-react-core-components';
import { RadiusNav } from '@rangle/radius-react-examples';
import {
  Github,
  Figma,
  ThemeBrush,
  Twitter,
  LinkedIn,
  Instagram,
  Youtube,
  LightMode,
  DarkMode,
  radiusTokens,
} from '@rangle/radius-foundations';
import { css } from '@emotion/css';
import { useIsScrolled } from '../hooks/use-is-scrolled';

function CustomApp({ Component, pageProps }: AppProps) {
  /** Temp helper to fix icon type collision due to the way they are exported */
  type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

  const modes = ['dark-mode', 'light-mode'];
  const themes = ['wellness', 'healthcare'];
  /** This should be integrated into a Page layout component, currently a WIP in design */
  const pageMaxWidth = 1280;
  const isScrolled = useIsScrolled();

  const [mode, setMode] = useState(1);
  const [theme, setTheme] = useState(1);

  const toggleMode = () => {
    setMode(mode ^ 1);
  };

  const toggleTheme = () => {
    setTheme(theme ^ 1);
  };

  return (
    <>
      <Head>
        <title>Radius Next Demo Application</title>
      </Head>
      <CacheProvider value={cache}>
        <main className={`${themes[theme]} ${modes[mode]}`}>
          <ThemeContext.Provider value={themes[theme]}>
            <RadiusAutoLayout
              width="fill-parent"
              height="hug-contents"
              fill={radiusTokens.component.color.navigation.background}
              className={css`
                position: sticky;
                top: 0;
                margin-bottom: calc(
                  var(${radiusTokens.component.spacing.layouts.gap.vertical}) *
                    -1
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
                    title: mode
                      ? 'Switch to dark mode'
                      : 'Switch to light mode',
                    as: 'button',
                    onClick: toggleMode,
                    icon: (mode ? DarkMode : LightMode) as IconType,
                  },
                  {
                    'aria-label': `Switch to ${themes[theme ^ 1]} theme`,
                    title: `Switch to ${themes[theme ^ 1]} theme`,
                    as: 'button',
                    onClick: toggleTheme,
                    icon: ThemeBrush,
                  },
                ]}
                logos={
                  <>
                    <a
                      href="#content"
                      data-radius-watch-token-changes
                      data-radius-target-selector="img"
                      data-radius-target-attribute="src"
                      data-radius-replace-value="/brand/{--brand}/assets/primary-logo-{--mode}.svg"
                    >
                      <RadiusAutoLayout
                        as="img"
                        alt={`${themes[theme]} logo`}
                        src={`/brand/${themes[theme]}/assets/primary-logo-light-mode.svg`}
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
            <Component {...pageProps} />
          </ThemeContext.Provider>
        </main>
      </CacheProvider>
    </>
  );
}

export default CustomApp;
