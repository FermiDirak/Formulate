import flow from 'rollup-plugin-flow';
import flowEntry from 'rollup-plugin-flow-entry'

export default {
  input: 'src/index.js',
  plugins: [
    flowEntry(),
    flow({pretty: true}),
  ],
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  external: [ 'react' ],
};
