<template>
  <v-card>
    <v-card-title class="text-h5">
      <v-icon class="mr-2">mdi-account-group</v-icon>
      Lista de Clientes
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$router.push('/add')">
        <v-icon left>mdi-plus</v-icon>
        Nuevo Cliente
      </v-btn>
    </v-card-title>
    
    <v-card-text>
      <v-alert v-if="clients.length === 0" type="info" class="mb-4">
        No hay clientes registrados. ¡Agrega el primero!
      </v-alert>
      
      <v-table v-else>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <v-btn icon @click="editClient(client.id)" color="primary">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="openDeleteDialog(client)" color="error">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      
      <v-divider class="my-4"></v-divider>
      
      <div class="text-caption text-grey">
        Total de clientes: {{ clients.length }}
      </div>
    </v-card-text>

    <!-- Diálogo de confirmación de eliminación -->
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">Confirmar Eliminación</v-card-title>
        <v-card-text>
          ¿Estás seguro de que quieres eliminar al cliente <strong>{{ clientToDelete?.name }}</strong>? 
          Esta acción no se puede deshacer.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" @click="confirmDelete" :loading="deleting">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar de notificaciones -->
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      :color="snackbarColor"
    >
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useSnackbar } from '@/composables/useSnackbar'

const store = useStore()
const router = useRouter()
const route = useRoute()
const { snackbar, snackbarText, snackbarColor, snackbarTimeout, showSnackbar } = useSnackbar()

const deleteDialog = ref(false)
const clientToDelete = ref(null)
const deleting = ref(false)

const clients = computed(() => store.getters['clients/getAllClients'])

// Detectar parámetros de URL al montar el componente
onMounted(() => {
  const { message, id } = route.query
  
  if (message === 'added') {
    showSnackbar('✅ Usuario agregado exitosamente', 'success', 3000)
    // Limpiar query parameters
    router.replace({ path: '/', query: {} })
  } else if (message === 'updated' && id) {
    const client = store.getters['clients/getClientById'](parseInt(id))
    const clientName = client ? client.name : 'el usuario'
    showSnackbar(`✅ Usuario "${clientName}" actualizado exitosamente`, 'success', 3000)
    // Limpiar query parameters
    router.replace({ path: '/', query: {} })
  }
})

const editClient = (id) => {
  router.push(`/edit/${id}`)
}

const openDeleteDialog = (client) => {
  clientToDelete.value = client
  deleteDialog.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    await store.dispatch('clients/deleteClient', clientToDelete.value.id)
    showSnackbar('✅ Usuario eliminado correctamente', 'success', 3000)
    deleteDialog.value = false
  } catch (error) {
    showSnackbar(error.message || 'Error al eliminar el usuario')
  } finally {
    deleting.value = false
  }
}
</script>

<style scoped>
.v-table {
  width: 100%;
}
</style>