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
    ],
    external: ['react', 'react-dom'],
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
        tsconfig: '../../config/typescript/tsconfig.build.json',
        include: [
          '*.ts+(|x)',
          '**/*.ts+(|x)',
          '../../library/foundations/**/*.ts+(|x)',
        ],
      }),
    ],
  },
];
