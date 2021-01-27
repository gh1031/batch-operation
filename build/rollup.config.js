const chalk = require('chalk');
const typescript = require('@rollup/plugin-typescript');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const nodePolyfills = require('rollup-plugin-node-polyfills');



console.log(chalk.green(`[current work directory]: ${process.cwd()}`))

const cjs =  {
  input: 'src/bin/index.ts',
  output: {
    file: 'cjs.bundle.js',
    dir: 'cjs',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    nodeResolve(),
    nodePolyfills(),
  ]
}

const esm = {
  ...cjs,
  output: {
    file: 'es.bundle.js',
    dir: 'es',
    format: 'es',
  }
}

export default [cjs, esm];
// export default {
//   input: 'src/bin/index.ts',
//   output: [{
//     dir: 'dist',
//     file: 'cjs.bundle.js',
//     format: 'cjs',
//   }, {
//     dir: 'dist',
//     file: 'es.bundle.js',
//     format: 'es',
//   }],
//   plugins: [
//     typescript()
//   ]
// }

