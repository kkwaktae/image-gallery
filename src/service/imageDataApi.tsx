import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.pexels.com/v1/',
  timeout: 30 * 1000,
  headers: {
    Authorization: process.env.REACT_APP_API_KEY as string,
  },
});

interface Params {
  page?: number;
  per_page?: number;
}

export const fetchImageData = async (url: string, params: Params) => {
  return instance.get(url, { params });
};
