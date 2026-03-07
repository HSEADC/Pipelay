import path from 'path'

/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.stories.@(js|ts)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'msw-storybook-addon',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  webpackFinal: async config => {
    if (!config.resolve) config.resolve = {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

    const imageRule = config.module?.rules?.find(rule => {
      const test = (rule && rule.test) as RegExp | undefined

      if (!test) {
        return false
      }

      return test.test('.svg')
    })

    if (imageRule) {
      imageRule.exclude = /\.svg$/
    }

    config.module = config.module || {}
    config.module.rules = config.module.rules || []

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config