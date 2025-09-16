<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-icon class="mr-2">mdi-account-cog</v-icon>
        Gestor de Clientes
      </v-toolbar-title>
    </v-app-bar>
    
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Snackbar global para notificaciones -->
    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="snackbarTimeout"
      location="top"
      multi-line
    >
      {{ snackbarText }}
      
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { useSnackbar } from './composables/useSnackbar'

const { snackbar, snackbarText, snackbarColor, snackbarTimeout } = useSnackbar()
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
}
</style>