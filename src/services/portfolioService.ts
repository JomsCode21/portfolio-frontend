import api, { unwrap } from './api';
import { resourceService } from './resourceService';
export const projects = resourceService('projects');
export const skills = resourceService('skills');
export const experience = resourceService('experience');
export const education = resourceService('education');
export const certifications = resourceService('certifications');
export const settings = {
  get: () => unwrap(api.get('/settings')),
  update: (data) => unwrap(api.put('/settings', data)),
};
export const uploads = {
  resume: (file) =>
    unwrap(
      api.post('/uploads/resume', file, {
        headers: { 'Content-Type': file.type || 'application/pdf' },
      }),
    ),
  heroImage: (file) =>
    unwrap(
      api.post('/uploads/hero-image', file, {
        headers: { 'Content-Type': file.type },
      }),
    ),
};
export const contact = {
  send: (data) => unwrap(api.post('/contact', data)),
  list: () => unwrap(api.get('/contact')),
  get: (id) => unwrap(api.get(`/contact/${id}`)),
  markRead: (id) => unwrap(api.put(`/contact/${id}/read`)),
  remove: (id) => unwrap(api.delete(`/contact/${id}`)),
};
export const dashboard = { stats: () => unwrap(api.get('/dashboard/stats')) };
