import { atom } from 'recoil';

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

export const selectedData = atom<Photo>({
  key: 'selectedData',
  default: {
    id: 0,
    width: 0,
    height: 0,
    url: '',
    photographer: '',
    photographer_url: '',
    photographer_id: 0,
    avg_color: '',
    src: {
      original: '',
      large2x: '',
      large: '',
      medium: '',
      small: '',
      portrait: '',
      landscape: '',
      tiny: '',
    },
    liked: false,
    alt: '',
  },
});

export const favoriteDataList = atom<Photo[]>({
  key: 'favoriteDataList',
  default: [],
});

export const filterData = atom<Photo[]>({
  key: 'filterData',
  default: [],
});

export const imageDataRes = atom<Photo[]>({
  key: 'imageDataRes',
  default: [],
});
