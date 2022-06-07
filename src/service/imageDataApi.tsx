import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  timeout: 30 * 1000,
  headers: { Authorization: process.env.REACT_APP_API_KEY as string },
});

export const fetchData = async () => {
  const { data } = await instance.get<Response>('/curated', {
    params: { page: 1, per_page: 30 },
  });
  return data;
};
