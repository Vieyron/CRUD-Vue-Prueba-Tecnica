/**
 * Utilidades de validación para la entidad Cliente
 * @module utils/validations
 */

/**
 * Valida los datos de un objeto Cliente según las reglas de negocio.
 * @param {Object} client - El objeto cliente a validar.
 * @param {string} client.name - El nombre del cliente (obligatorio, max 50 chars).
 * @param {string} client.email - El email del cliente (obligatorio, formato válido).
 * @param {string} client.phone - El teléfono del cliente (obligatorio, solo números, 10 dígitos).
 * @throws {Error} Lanza un error con un mensaje descriptivo si la validación falla.
 */
export const validateClient = (client) => {
  if (!client.name || !client.email || !client.phone) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (client.name.length > 50) {
    throw new Error('El nombre no puede exceder los 50 caracteres');
  }

  if (client.email.length > 50) {
    throw new Error('El email no puede exceder los 50 caracteres');
  }

  const emailRegex = /.+@.+\..+/;
  if (!emailRegex.test(client.email)) {
    throw new Error('Formato de email inválido');
  }

  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(client.phone)) {
    throw new Error('El teléfono solo puede contener números');
  }

  if (client.phone.length !== 10) {
    throw new Error('El teléfono debe contener exactamente 10 dígitos');
  }
};

/**
 * Datos de clientes por defecto para inicialización
 */
export const defaultClients = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@email.com',
    phone: '1234567890'
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@email.com',
    phone: '0987654321'
  }
];