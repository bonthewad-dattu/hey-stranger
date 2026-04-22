import api from './api';

// LOGIN
export const login = (data) => api.post('/auth/login', data);

// REGISTER
export const register = (data) => api.post('/auth/register', data);

// GET USER
export const getCurrentUser = () => api.get('/auth/me');

// UPDATE USER
export const updateCurrentUser = (data) => api.patch('/auth/me', data);

// DELETE USER
export const deleteCurrentUser = () => api.delete('/auth/me');