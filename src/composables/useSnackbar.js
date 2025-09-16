/**
 * Composable para manejar notificaciones tipo snackbar
 * @module composables/useSnackbar
 */

import { ref } from 'vue';

/**
 * Hook para gestionar notificaciones en la aplicación
 * @returns {Object} Estado y métodos para controlar las notificaciones
 */
export function useSnackbar() {
  const snackbar = ref(false);
  const snackbarText = ref('');
  const snackbarColor = ref('error');
  const snackbarTimeout = ref(3000);

  /**
   * Muestra una notificación al usuario
   * @param {string} message - Mensaje a mostrar
   * @param {string} color - Color de la notificación (ej: 'error', 'success', 'warning')
   * @param {number} timeout - Tiempo en milisegundos que se mostrará la notificación
   */
  const showSnackbar = (message, color = 'error', timeout = 3000) => {
    snackbarText.value = message;
    snackbarColor.value = color;
    snackbarTimeout.value = timeout;
    snackbar.value = true;
  };

  return {
    snackbar,
    snackbarText,
    snackbarColor,
    snackbarTimeout,
    showSnackbar
  };
}