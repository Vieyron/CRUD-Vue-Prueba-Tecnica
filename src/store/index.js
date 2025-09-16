import { createStore } from 'vuex'
import clients from './modules/clients'

/**
 * Store principal de Vuex
 * Configura y exporta el store con todos los módulos
 */
export default createStore({
  modules: {
    clients
  }
})