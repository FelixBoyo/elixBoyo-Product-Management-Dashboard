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
    base: '/build/', // ✅ Safe, consistent for both local & production
  });
  