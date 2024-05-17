// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
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
  runtimeConfig: {
    public: {
      API_KEY: "AIzaSyDsDGNI_nsTLccoc0qVYV3cGfv1TtJ6-KU",
      AUTH_DOMAIN: "opinionline-77a42.firebaseapp.com",
      PROJECT_ID: "opinionline-77a42",
      STORAGE_BUCKET: "gs://opinionline-77a42.appspot.com",
      MESSAGING_SENDER_ID: "370890248236",
      APP_ID: "1:370890248236:web:03c97fb2c02a5fbb99c189",
      MEASUREMENT_ID: "G-H7Z9WTPC0Q",
      DB_URL: "https://opinionline-77a42-default-rtdb.firebaseio.com",
    }
  }
})
