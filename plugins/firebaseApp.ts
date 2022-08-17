import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDsDGNI_nsTLccoc0qVYV3cGfv1TtJ6-KU",
  authDomain: "opinionline-77a42.firebaseapp.com",
  projectId: "opinionline-77a42",
  storageBucket: "opinionline-77a42.appspot.com",
  messagingSenderId: "370890248236",
  appId: "1:370890248236:web:03c97fb2c02a5fbb99c189",
  measurementId: "G-H7Z9WTPC0Q",
  databaseURL: "https://opinionline-77a42-default-rtdb.firebaseio.com"

};

const app = initializeApp(firebaseConfig);

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      firebaseApp: () => app
    }
  }
});