import api, { unwrap } from './api';
export const resourceService = (resource) => ({
  list: () => unwrap(api.get(`/${resource}`)),
  get: (id) => unwrap(api.get(`/${resource}/${id}`)),
  create: (data) => unwrap(api.post(`/${resource}`, data)),
  update: (id, data) => unwrap(api.put(`/${resource}/${id}`, data)),
  remove: (id) => unwrap(api.delete(`/${resource}/${id}`)),
});
