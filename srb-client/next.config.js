const withTypescript = require('@zeit/next-typescript')
const withTM = require('@weco/next-plugin-transpile-modules')
const withGraphQL = require("next-plugin-graphql")
const path = require('path')

module.exports = withGraphQL(withTypescript(withTM({
  transpileModules: ['srb-shared'],
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  }
})))
