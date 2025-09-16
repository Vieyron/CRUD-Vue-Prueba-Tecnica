Gestor de Clientes - Vue 3 CRUD
 Una aplicación para la gestión de clientes construida con Vue 3, implementando operaciones CRUD con persistencia de datos e interfaz responsiva.

Características.
 -CRUD Completo: Crear, leer, actualizar y eliminar clientes
 -Validación de Datos: Validación en frontend y backend
 -Persistencia: Almacenamiento persistente en localStorage
 -Interfaz Moderna: Diseño responsivo con Vuetify
 -Navegación SPA: Single Page Application con Vue Router
 -Notificaciones: Feedback visual con snackbars elegantes

Tecnologías Utilizadas.
 -Vue 3 - Framework principal
 -Composition API - Estilo de Vue
 -Vuex - Gestión de estado centralizado
 -Vue Router - Navegación entre vistas
 -Vuetify - Componentes de UI material design
 -LocalStorage - Persistencia de datos

Estructura del Proyecto.

src
 components
    clients
        ClientForm.vue      # Formulario de creación/edición
        ClientList.vue      # Lista de clientes
 composables
    useSnackbar.js          # Hook para notificaciones
plugins                     # configurar e inicializar el framework de manera centralizada
    vuetify.js              
    webfontloader.js
router
    index.js                # Configuración de rutas
 store
    modules
        clients.js          # Store Vuex para clientes
    index.js                # Store principal
 utils
    validations.js          # Utilidades de validación
 views
    ClientFormView.vue      # Vista del formulario
    ClientListView.vue      # Vista principal
 App.vue                     # Componente principal
 main.js                     # Punto de entrada       


Funcionalidades Implementadas.

 Funcionales:
  -Listado de clientes con tabla responsiva
  -Alta de clientes con formulario validado
  -Edición de clientes con pre-carga de datos
  -Eliminación de clientes con confirmación

 Técnicos:
  -Vue 3 + Composition API en todos los componentes
  -Vuex con persistencia en localStorage
  -Vue Router con rutas configuradas
  -Vuetify para interfaz de usuario
  -Estructura modular y separación de concerns

 Adicionales:
  -Validación completa en frontend y backend
  -Manejo de errores con mensajes descriptivos
  -Notificaciones de éxito para todas las operaciones


Instalación y Ejecución

Prerrequisitos:
 Node.js (versión 14 o superior)
 npm o yarn

Pasos para ejecutar:
 1. Instalar dependencias:
  npm install vuex
  npm install router
  npm install vuetify

 2.Ejecutar la aplicación de forma local o network:
  npm run serve

 3.Abrir en el navegador:
  local: http://localhost:8080/  
  network:http://192.168.100.9:8080/

Validaciones Implementadas
 Para todos los campos:
  Campos obligatorios
  Longitud máxima (50 caracteres para nombre y email)

Validaciones específicas:
 Email: Formato válido (usuario@dominio.com)

Teléfono: Solo números y exactamente 10 dígitos

Flujo de la Aplicación
 Agregar Cliente:
  1.Navegar a "/add"
  2.Llenar formulario con validación en tiempo real
  3.Guardar -> Validación backend -> Persistencia -> Notificación -> Redirección

 Editar Cliente:
  1.Click en ícono de edición en la lista
  2.Formulario pre-cargado con datos existentes
  3.Actualizar -> Validación -> Persistencia -> Notificación -> Redirección

 Eliminar Cliente:
  1.Click en ícono de eliminación
  2.Diálogo de confirmación
  3.Eliminar -> Persistencia -> Notificación