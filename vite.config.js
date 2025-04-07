import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

const appUrl = process.env.APP_URL || 'http://localhost';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        https: true,
        host: 'localhost',
    },
    base: appUrl + '/build/', // Explicitly use APP_URL with /build/
    build: {
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => `assets/[name].[hash][extname]`,
                chunkFileNames: 'assets/js/[name].[hash].js',
                entryFileNames: 'assets/js/[name].[hash].js',
            },
        },
    },
});