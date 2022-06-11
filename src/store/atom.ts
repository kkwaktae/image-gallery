import { atom } from 'recoil';

export const selectedDataPhotographerUrl = atom<string | undefined>({
  key: 'selectedDataPhotographerUrl',
  default: '',
});

export const selectedDataPhotographer = atom<string | undefined>({
  key: 'selectedDataPhotographer',
  default: '',
});

export const selectedDataUrl = atom<string | undefined>({
  key: 'selectedDataUrl',
  default: '',
});

export const selectedDataAlt = atom<string | undefined>({
  key: 'selectedDataAlt',
  default: '',
});

export const selectedDataSrc = atom<string | undefined>({
  key: 'selectedDataSrc',
  default: '',
});

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});

export const filterState = atom<boolean>({
  key: 'filterState',
  default: false,
});

export const perPageState = atom<number>({
  key: 'perPageState',
  default: 30,
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
