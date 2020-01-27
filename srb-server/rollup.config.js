import typescript from 'rollup-plugin-typescript2'
import graphql from 'rollup-plugin-graphql'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import autoExternal from 'rollup-plugin-auto-external'
import run from 'rollup-plugin-run'
import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.ts',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  watch: {
    exclude: ['node_modules/**']
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    typescript({
      include: [
        './src/**/*.ts',
        '../srb-shared/**/*.ts'
      ]
    }),
    autoExternal(),
    graphql(),
    commonjs(),
    json(),
    run()
  ]
}