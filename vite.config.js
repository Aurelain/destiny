import {defineConfig} from 'vite';
import ViteReact from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [ViteReact()],
    base: './',
    build: {
        outDir: './docs',
    },
});
