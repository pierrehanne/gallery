import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './', // Using relative base for better GitHub Pages compatibility

    build: {
        target: 'ES2020',
        minify: 'terser',
        sourcemap: false,
        outDir: 'dist',
        emptyOutDir: true,
        // Optimize bundle size
        rollupOptions: {
            output: {
                // Enable tree-shaking by using ES modules
                format: 'es',
                // Inline small modules to reduce HTTP requests
                inlineDynamicImports: false,
            },
        },
        // Reduce chunk size warnings
        chunkSizeWarningLimit: 500,
        // Enable minification for all files
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 2,
            },
            mangle: true,
            format: {
                comments: false,
            },
        },
    },
    server: {
        port: 5173,
        open: true,
    },
});
