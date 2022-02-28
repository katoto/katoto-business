import { builtinModules } from 'module';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import url from '@rollup/plugin-url';
import postcssUrl from 'postcss-url';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import pkg from './package.json';
import path from 'path';

export default [
  {
    input: 'src/index.tsx',
    output: { file: pkg.module, format: 'esm', sourcemap: true },
    ...getCommonConfig(pkg.module),
  },
  {
    input: 'src/index.tsx',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    ...getCommonConfig(pkg.main),
  },
];

function getCommonConfig(file) {
  const dir = path.dirname(file);

  return {
    plugins: [
      external(),
      url(),
      postcss({
        to: path.join(dir, 'assets'),
        extract: true,
        plugins: [
          autoprefixer(),
          postcssUrl({
            url: 'inline',
            maxSize: 8, // 单位为 kb
            fallback: 'copy',
            assetsPath: './',
          }),
        ],
      }),
      typescript({
        tsconfigOverride: {
          include: ['src', 'types.d.ts'],
          exclude: ['**/__tests__', '**/tests'],
        },
      }),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      }),
      del({ targets: [`${dir}/**`] }),
    ],
    external: [
      ...builtinModules,
      ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
      ...(pkg.peerDependencies == null
        ? []
        : Object.keys(pkg.peerDependencies)),
      // 对于 @babel/runtime 使用正则来排除
      /@babel\/runtime/,
    ],
  };
}
