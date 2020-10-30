import axios from 'axios';

export const Api = {
  get: async (path: string, params = {}) => {
    let response = await axios.get(path, params);
    return response.data;
  },
  post: async (path: string, body: any, options = {}) => {
    let response = await axios.post(path, body, options);
    return response.data;
  },
};
