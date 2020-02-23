import flow from 'rollup-plugin-flow';
import flowEntry from 'rollup-plugin-flow-entry'

export default {
  input: ['src/index.js', 'src/validators.js'],
  plugins: [
    flowEntry({mode: 'strict'}),
    flow({pretty: true, all: true}),
  ],
  output: {
    dir: '.',
  },
  external: [ 'react' ],
};
