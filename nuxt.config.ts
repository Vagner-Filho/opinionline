import { randomBytes } from 'node:crypto'

export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    modules: ["@nuxt/ui", "@nuxt/test-utils/module"],

    // @ts-ignore
    colorMode: {
        preference: 'system', // default value of $colorMode.preference
        fallback: 'light', // fallback value if not system preference found
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '',
        storageKey: 'nuxt-color-mode'
    },

    extensions: ['.sql'],

    runtimeConfig: {
        psswdSecret: randomBytes(64).toString('hex'),
        jwtSecret: randomBytes(64).toString('hex'),
    },

    compatibilityDate: '2024-08-21'
})
