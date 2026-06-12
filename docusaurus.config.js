// @ts-check
const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Java Interview Prep',
  tagline: 'Mid-level Java concepts, examples, and active-recall practice',
  favicon: 'img/favicon.ico',

  url: 'https://offthegrid-mike.github.io',
  baseUrl: '/Java-study/',
  organizationName: 'offthegrid-mike',
  projectName: 'Java-study',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  i18n: {defaultLocale: 'en', locales: ['en']},

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {customCss: require.resolve('./src/css/custom.css')},
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Java Interview Prep',
        items: [
          {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Topics'},
          {to: '/progress', label: 'My Progress', position: 'left'},
          {href: 'https://docs.oracle.com/en/java/', label: 'Java Docs', position: 'right'},
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Built for interview prep. Powered by Docusaurus.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['java'],
      },
      colorMode: {respectPrefersColorScheme: true},
    }),
};

module.exports = config;
