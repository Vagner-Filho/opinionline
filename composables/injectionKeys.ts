import type { InjectionKey } from 'vue';
import { FirebaseApp } from '@firebase/app-types';

export const firebaseAppKey = () => {
  return Symbol() as InjectionKey<FirebaseApp>;
}