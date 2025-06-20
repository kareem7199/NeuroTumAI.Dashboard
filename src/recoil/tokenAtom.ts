import { atom } from 'recoil';

export const tokenState = atom<string | null>({
  key: 'token',
  default: localStorage.getItem('token'),
});
