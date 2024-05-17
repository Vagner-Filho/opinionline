import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue';
import { alias } from './utils/alias';

export default defineConfig({
    root: '.',
    plugins: [vue()],
    test: {
        // ... Specify options here.
        environment: 'happy-dom',

    },
    resolve: {
        alias
    }
})
