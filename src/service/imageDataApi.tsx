import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.pexels.com/v1',
  timeout: 30 * 1000,
  headers: { Authorization: process.env.REACT_APP_API_KEY as string },
});

interface Params {
  page: number;
  per_page?: number;
}

export const fetchData = async (params: Params) => {
  const res = await instance.get<Response>('/curated', { params });
  return res.data;
};
