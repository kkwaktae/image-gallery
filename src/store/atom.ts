import { atom } from 'recoil';

export const filtedData = atom<Photo[]>({
  key: 'filtedData',
  default: [],
});

export const searchResult = atom<string>({
  key: 'searchResult',
  default: '',
});

export const imageDataRes = atom<Photo[]>({
  key: 'imageDataRes',
  default: [],
});
