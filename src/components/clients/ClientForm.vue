<template>
  <v-card>
    <v-card-title class="text-h5">
      <v-icon class="mr-2">{{ isEditing ? 'mdi-pencil' : 'mdi-plus' }}</v-icon>
      {{ isEditing ? 'Editar Cliente' : 'Nuevo Cliente' }}
    </v-card-title>
    
    <v-card-text>
      <v-form ref="form" @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.name"
          label="Nombre"
          :rules="[
            v => !!v || 'El nombre es obligatorio',
            v => (v && v.length <= 50) || 'Máximo 50 caracteres'
          ]"
          :counter="50"
          required
          prepend-icon="mdi-account"
        ></v-text-field>
        
        <v-text-field
          v-model="formData.email"
          label="Correo Electrónico"
          type="email"
          :rules="[
            v => !!v || 'El email es obligatorio',
            v => (v && v.length <= 50) || 'Máximo 50 caracteres',
            v => /.+@.+\..+/.test(v) || 'Email debe ser válido'
          ]"
          :counter="50"
          required
          prepend-icon="mdi-email"
        ></v-text-field>
        
        <v-text-field
          v-model="formData.phone"
          label="Teléfono"
          :rules="[
            v => !!v || 'El teléfono es obligatorio',
            v => (v && /^\d+$/.test(v)) || 'Solo se permiten números',
            v => (v && v.length === 10) || 'Debe tener exactamente 10 dígitos'
          ]"
          required
          prepend-icon="mdi-phone"
        ></v-text-field>
        
        <v-card-actions>
          <v-btn type="submit" color="primary" class="mr-2" :loading="loading">
            <v-icon left>{{ isEditing ? 'mdi-content-save' : 'mdi-check' }}</v-icon>
            {{ isEditing ? 'Actualizar' : 'Guardar' }}
          </v-btn>
          
          <v-btn @click="$router.push('/')" color="secondary">
            <v-icon left>mdi-arrow-left</v-icon>
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from '@/composables/useSnackbar'

const store = useStore()
const route = useRoute()
const router = useRouter()
const form = ref(null)
const { showSnackbar } = useSnackbar() // Solo necesitamos showSnackbar

const formData = ref({
  name: '',
  email: '',
  phone: ''
})

const loading = ref(false)
const isEditing = computed(() => route.name === 'ClientEdit')

// Cargar datos si estamos editando
onMounted(() => {
  if (isEditing.value && route.params.id) {
    const clientId = parseInt(route.params.id)
    const client = store.getters['clients/getClientById'](clientId)
    
    if (client) {
      formData.value = { ...client }
    } else {
      showSnackbar('Cliente no encontrado')
      router.push('/')
    }
  }
})

const submitForm = async () => {
  const { valid } = await form.value.validate()
  
  if (!valid) {
    showSnackbar('Por favor, corrige los errores en el formulario')
    return
  }

  loading.value = true

  try {
    if (isEditing.value) {
      await store.dispatch('clients/updateClient', formData.value)
      router.push({ path: '/', query: { message: 'updated', id: formData.value.id } })
    } else {
      await store.dispatch('clients/addClient', formData.value)
      router.push({ path: '/', query: { message: 'added' } })
    }
  } catch (error) {
    showSnackbar(error.message || 'Error al guardar el cliente')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>