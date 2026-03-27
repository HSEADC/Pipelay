import path from 'path'
import type { RuleSetRule, RuleSetUse } from 'webpack'

const rootDir = path.resolve('.')

const hovermediaPath = path.resolve(rootDir, 'plugins/hovermedia.cjs')

function injectPostcssLoader(rules: RuleSetRule[] | undefined): void {
  if (!rules) return

  for (const rule of rules) {
    if (!rule || typeof rule !== 'object') continue

    const r = rule as RuleSetRule & {
      oneOf?: RuleSetRule[]
      rules?: RuleSetRule[]
      test?: RegExp
      use?: RuleSetUse | RuleSetUse[]
    }

    if (Array.isArray(r.oneOf)) {
      injectPostcssLoader(r.oneOf)
      continue
    }
    if (Array.isArray(r.rules)) {
      injectPostcssLoader(r.rules)
      continue
    }

    if (!(r.test instanceof RegExp) || !r.test.test('x.css')) {
      continue
    }
    if (r.use == null) {
      continue
    }

    const useList = (
      Array.isArray(r.use) ? [...r.use] : [r.use]
    ) as RuleSetUse[]
    const hasPostcss = useList.some((item) => {
      if (typeof item === 'string') return item.includes('postcss')
      if (item && typeof item === 'object' && 'loader' in item) {
        return String((item as { loader?: string }).loader ?? '').includes('postcss')
      }
      return false
    })
    if (hasPostcss) {
      continue
    }

    for (const item of useList) {
      if (!item || typeof item !== 'object' || !('loader' in item)) continue
      const loader = String((item as { loader?: string }).loader ?? '')
      if (!loader.includes('css-loader')) continue
      const raw = item as { options?: { importLoaders?: number } }
      raw.options = raw.options ?? {}
      const prev = Number(raw.options.importLoaders ?? 0)
      raw.options.importLoaders = Math.max(prev, 1)
    }

    useList.push({
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer', 'postcss-preset-env', hovermediaPath],
        },
      },
    })
    r.use = useList
  }
}

/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  staticDirs: [{ from: path.join(rootDir, 'src/assets'), to: '/assets' }],
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
      '@': path.resolve(rootDir, 'src'),
      '@shared': path.resolve(rootDir, 'src/shared'),
      '@entities': path.resolve(rootDir, 'src/entities'),
      '@pages': path.resolve(rootDir, 'src/pages'),
      '@features': path.resolve(rootDir, 'src/features'),
      '@widgets': path.resolve(rootDir, 'src/widgets'),
    }

    const extensions = config.resolve.extensions ?? []
    for (const ext of ['.ts', '.tsx']) {
      if (!extensions.includes(ext)) {
        extensions.unshift(ext)
      }
    }
    config.resolve.extensions = extensions

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
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-typescript'],
          plugins: ['@babel/plugin-transform-class-properties'],
          cacheDirectory: true,
        },
      },
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    injectPostcssLoader(config.module.rules as RuleSetRule[])

    return config
  },
  docs: {
    autodocs: 'tag',
  },
}

export default config