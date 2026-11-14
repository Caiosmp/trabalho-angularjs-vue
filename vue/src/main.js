import { createApp } from 'vue'
import App from './App.vue'
import { toast } from './servicos/toast'
import './style.css'

const app = createApp(App)

app.config.globalProperties.$toast = toast

app.mount('#app')
