import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                    return null;
                },
            },
        },
        sourcemap: true,
    },
    plugins: [
        createHtmlPlugin({
            entry: undefined,
        }),
    ],
});
