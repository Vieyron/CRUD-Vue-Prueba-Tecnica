/**
 * Módulo Vuex para la gestión de clientes
 * Implementa operaciones CRUD con validaciones y persistencia en localStorage
 */
import { validateClient, defaultClients } from '@/utils/validations';

const state = {
  clients: []
};

// Cargar datos iniciales de manera segura
try {
  const storedClients = JSON.parse(localStorage.getItem('clients'));
  if (Array.isArray(storedClients) && storedClients.length > 0) {
    state.clients = storedClients;
  } else {
    state.clients = [...defaultClients];
    localStorage.setItem('clients', JSON.stringify(state.clients));
  }
} catch (e) {
  console.error('Error loading clients from localStorage:', e);
  state.clients = [...defaultClients];
  localStorage.setItem('clients', JSON.stringify(state.clients));
}

const mutations = {
  ADD_CLIENT(state, client) {
    validateClient(client);
    
    // Generación de ID más robusta
    client.id = state.clients.reduce((maxId, client) => 
      Math.max(maxId, client.id), 0) + 1;
    
    state.clients.push(client);
    localStorage.setItem('clients', JSON.stringify(state.clients));
  },
  
  UPDATE_CLIENT(state, updatedClient) {
    validateClient(updatedClient);

    const index = state.clients.findIndex(c => c.id === updatedClient.id);
    
    if (index === -1) {
      throw new Error('Cliente no encontrado');
    }

    state.clients.splice(index, 1, updatedClient);
    localStorage.setItem('clients', JSON.stringify(state.clients));
  },
  
  DELETE_CLIENT(state, clientId) {
    state.clients = state.clients.filter(c => c.id !== clientId);
    localStorage.setItem('clients', JSON.stringify(state.clients));
  }
}

const actions = {
  addClient({ commit }, client) {
    return new Promise((resolve, reject) => {
      try {
        commit('ADD_CLIENT', client);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  
  updateClient({ commit }, client) {
    return new Promise((resolve, reject) => {
      try {
        commit('UPDATE_CLIENT', client);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
  
  deleteClient({ commit }, clientId) {
    return new Promise((resolve, reject) => {
      try {
        commit('DELETE_CLIENT', clientId);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

const getters = {
  getAllClients: (state) => state.clients,
  getClientById: (state) => (id) => {
    return state.clients.find(client => client.id === id) || null;
  },
  getTotalClients: (state) => state.clients.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}