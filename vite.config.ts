import { defineConfig } from 'vite-plus';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  fmt: {
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: ['dist', 'build', 'coverage', 'node_modules'],
  },
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts'],
  },
  build: {
    lib: {
      entry: path.resolve(rootDir, 'src/index.ts'),
      name: 'vueleaflet',
      fileName: (format) => `vueleaflet.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'leaflet'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          leaflet: 'L',
        },
      },
    },
  },
});
