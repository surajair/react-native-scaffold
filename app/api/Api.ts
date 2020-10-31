import axios from 'axios';
import Config from 'react-native-config';
import { RemoteApi } from '../Types';

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
});

axiosInstance.defaults.headers.common.Authorization =
  'Bearer ' + Config.AUTH_TOKEN;

export const Api: RemoteApi = {
  get: async (path: string, params = {}) => {
    console.log('GET', Config.BASE_URL + path, params);
    let response = await axiosInstance.get(path, params);
    return response.data;
  },
  post: async (path: string, body: any, options = {}) => {
    console.log('POST', Config.BASE_URL + path, body);
    let response = await axiosInstance.post(path, body, options);
    return response.data;
  },
};
