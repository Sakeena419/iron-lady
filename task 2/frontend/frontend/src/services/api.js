import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Participants API
export const participantAPI = {
  getAll: (filters = {}) => api.get('/participants', { params: filters }),
  getById: (id) => api.get(`/participants/${id}`),
  create: (data) => api.post('/participants', data),
  update: (id, data) => api.put(`/participants/${id}`, data),
  delete: (id) => api.delete(`/participants/${id}`),
};

// Programs API
export const programAPI = {
  getAll: (filters = {}) => api.get('/programs', { params: filters }),
  getById: (id) => api.get(`/programs/${id}`),
  create: (data) => api.post('/programs', data),
  update: (id, data) => api.put(`/programs/${id}`, data),
  delete: (id) => api.delete(`/programs/${id}`),
};

// Enrollments API
export const enrollmentAPI = {
  getAll: (filters = {}) => api.get('/enrollments', { params: filters }),
  getById: (id) => api.get(`/enrollments/${id}`),
  create: (data) => api.post('/enrollments', data),
  update: (id, data) => api.put(`/enrollments/${id}`, data),
  delete: (id) => api.delete(`/enrollments/${id}`),
};

// Module Progress API
export const moduleProgressAPI = {
  create: (data) => api.post('/module-progress', data),
};

// Assignments API
export const assignmentAPI = {
  create: (data) => api.post('/assignments', data),
  update: (id, data) => api.put(`/assignments/${id}`, data),
};

// Milestones API
export const milestoneAPI = {
  getAll: (filters = {}) => api.get('/milestones', { params: filters }),
  create: (data) => api.post('/milestones', data),
};

// Transformation Stories API
export const transformationStoryAPI = {
  getAll: (filters = {}) => api.get('/transformation-stories', { params: filters }),
  create: (data) => api.post('/transformation-stories', data),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getProgramPerformance: () => api.get('/dashboard/program-performance'),
};

export default api;
