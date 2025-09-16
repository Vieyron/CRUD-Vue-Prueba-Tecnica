import { createRouter, createWebHistory } from 'vue-router'
import ClientListView from '../views/ClientListView.vue'
import ClientFormView from '../views/ClientFormView.vue'

/**
 * Configuración de rutas de la aplicación
 * Define las rutas y sus componentes asociados
 */
const routes = [
  {
    path: '/',
    name: 'ClientList',
    component: ClientListView,
    meta: { title: 'Lista de Clientes' }
  },
  {
    path: '/add',
    name: 'ClientAdd',
    component: ClientFormView,
    meta: { title: 'Nuevo Cliente' }
  },
  {
    path: '/edit/:id',
    name: 'ClientEdit',
    component: ClientFormView,
    props: true,
    meta: { title: 'Editar Cliente' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

/**
 * Instancia del router de Vue Router
 */
const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * Guard global para cambiar el título de la página
 */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Gestor de Clientes` : 'Gestor de Clientes'
  next()
})

export default router
