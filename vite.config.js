import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        https: true, // Enable HTTPS for Vite dev server (if you're using it)
        host: 'localhost',
    },
    // Add this base option to ensure assets are served with HTTPS in production
    base: process.env.APP_URL + '/',
});
