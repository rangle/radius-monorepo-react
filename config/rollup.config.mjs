import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

// TODO: create 3 versions for sass/emotion/styled

export default [
  {
    input: 'index.ts',
    output: [
      {
        format: 'esm',
        file: './dist/index.esm.js',
        sourcemap: true,
      },
      {
        format: 'cjs',
        file: './dist/index.js',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom', /@emotion\/.*/, /@rangle\/radius-.*/],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        plugins: [autoprefixer()],
        extract: true,
        modules: true,
        minimize: true,
        use: ['sass'],
      }),
      typescript({
        noEmitOnError: true, // necessary so that Rollup stops the build and shows TS errors
        tsconfig: '../../config/typescript/tsconfig.build.json',
        include: [
          '../../**/*.ts',
          '../../**/*.tsx',
          '../../library/foundations/**/*.ts+(|x)',
        ],
      }),
    ],
  },
];
