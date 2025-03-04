import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

import './assets/main.css'
import './assets/reset.css'

// Buat instance aplikasi
const app = createApp(App)

// Gunakan router
app.use(router)
app.use(createPinia())

// Mount ke elemen #app
app.mount('#app')
