import { writeFileSync } from 'node:fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import CleanCSS from 'clean-css';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/uppy.bundle.js',
    format: 'esm',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true, exportConditions: ['browser', 'module', 'default'] }),
    commonjs(),
    css({
      output: (styles) => {
        const { styles: minifiedStyles } = new CleanCSS().minify(styles);
        writeFileSync('dist/uppy.css', minifiedStyles);
      },
    }),
    terser(),
  ],
};
