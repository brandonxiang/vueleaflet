import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
            main: resolve(__dirname, 'index.example.html'),
            }
        }
        },
    plugins: [vue()],
})