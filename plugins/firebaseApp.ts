import { initializeApp } from 'firebase/app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.API_KEY,
    authDomain: config.public.AUTH_DOMAIN,
    projectId: config.public.PROJECT_ID,
    storageBucket: config.public.STORAGE_BUCKET,
    messagingSenderId: config.public.MESSAGING_SENDER_ID,
    appId: config.public.APP_ID,
    measurementId: config.public.MEASUREMENT_ID,
    databaseURL: config.public.DB_URL,
  };
  const app = initializeApp(firebaseConfig);
  return {
    provide: {
      firebaseApp: () => app
    }
  }
});