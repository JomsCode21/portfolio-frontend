import api, { unwrap } from './api';
export const authService = {
  login: (data) => unwrap(api.post('/auth/login', data)),
  me: () => unwrap(api.get('/auth/me')),
};
