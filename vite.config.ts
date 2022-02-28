import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteReactMd } from '@hll/rollup-plugin-react-md';
import viteVan from '@hll/vite-plugin-van';
import path from 'path';

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), viteReactMd(), viteVan()],
  resolve: {
    alias: {
      '@hll/stone-business': path.resolve(projectRootDir, 'src/index.tsx'),
    },
  },
  build: {
    outDir: 'docs-dist',
  },
});
