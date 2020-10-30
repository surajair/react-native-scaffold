import localStorageMemory from 'localstorage-memory';

export default {
  setItem: async (key, value) => localStorageMemory.setItem(key, value),
  getItem: async (key) => localStorageMemory.getItem(key),
  removeItem: async (key) => localStorageMemory.removeItem(key),
};
