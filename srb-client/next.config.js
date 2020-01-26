const withTypescript = require('@zeit/next-typescript')
const withTM = require('@weco/next-plugin-transpile-modules')
const path = require('path')

const typescriptTM = withTypescript(
  withTM({
    transpileModules: ['srb-shared']
  })
)

module.exports = {
  ...typescriptTM,
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  }
}