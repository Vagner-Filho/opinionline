import { createApp } from 'vue'
import router from './router'
import Opinionline from './Opinionline.vue'

const app = createApp(Opinionline)

app.use(router)

app.mount('#app')
