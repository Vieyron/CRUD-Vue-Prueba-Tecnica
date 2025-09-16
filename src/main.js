import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'

/**
 * Punto de entrada principal de la aplicación Vue
 */
const app = createApp(App)

// Usar plugins
app.use(router)
app.use(store)
app.use(vuetify)

// Montar la aplicación
app.mount('#app')