import { createApp } from 'vue'
import Opinionline from './Opinionline.vue'

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDsDGNI_nsTLccoc0qVYV3cGfv1TtJ6-KU",
//   authDomain: "opinionline-77a42.firebaseapp.com",
//   projectId: "opinionline-77a42",
//   storageBucket: "opinionline-77a42.appspot.com",
//   messagingSenderId: "370890248236",
//   appId: "1:370890248236:web:03c97fb2c02a5fbb99c189",
//   measurementId: "G-H7Z9WTPC0Q"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

createApp(Opinionline).mount('#app')
