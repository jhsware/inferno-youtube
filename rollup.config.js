import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import replace from 'rollup-plugin-replace';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    file: `dist/index.cjs${isProduction ? '.min' : ''}.js`,
    format: 'cjs',
    sourcemap: true,
    globals: {
      inferno: 'Inferno',
      'inferno-create-element': 'infernoCreateElement'
    }
  },
  plugins: [
    babel({
      runtimeHelpers: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    isProduction ? minify({
      comments: false,
    }) : false
  ],
  external: [
    'inferno',
    'inferno', 'inferno-create-element'
  ]
}