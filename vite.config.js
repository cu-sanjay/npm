import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'DynamicFavicon',
      fileName: (format) => `dynamic-favicon.${format}.js`,
    },
  },
});