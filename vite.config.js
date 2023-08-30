import {defineConfig} from 'vite';
import ViteReact from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        ViteReact(),
        VitePWA({
            registerType: 'autoUpdate',
            strategies: 'injectManifest',
            srcDir: 'src/sw',
            filename: 'sw.js',
            manifest: false,
            injectRegister: false,
            devOptions: {
                enabled: true,
            },
        }),
    ],
    base: './',
    build: {
        outDir: './docs',
    },
    server: {
        port: 1000,
    },
});
