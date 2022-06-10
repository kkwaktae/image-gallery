import { atom } from 'recoil';

export const filterState = atom<boolean>({
  key: 'filterState',
  default: false,
});

export const pageState = atom<number>({
  key: 'pageState',
  default: 1,
});

export const searchResult = atom<string>({
  key: 'searchResult',
  default: '',
});

export const filterData = atom<Photo[]>({
  key: 'filterData',
  default: [],
});

export const imageDataRes = atom<Photo[]>({
  key: 'imageDataRes',
  default: [],
});
