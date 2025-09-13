import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  // CommonJS build
  {
    input: 'src/short-uid.ts',
    output: {
      file: 'dist/short-uid.js',
      format: 'cjs',
      exports: 'auto',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ],
    external: []
  },
  // ES Module build
  {
    input: 'src/short-uid.ts',
    output: {
      file: 'dist/short-uid.esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ],
    external: []
  },
  // UMD build (minified)
  {
    input: 'src/short-uid.ts',
    output: {
      file: 'dist/short-uid.min.js',
      format: 'umd',
      name: 'ShortUID',
      sourcemap: true
    },
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser()
    ],
    external: []
  }
];

