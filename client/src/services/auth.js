import api from './api';

// LOGIN
export const login = async (data) => {
  const res = await api.post('/auth/login', data);

  // ✅ SAVE TOKEN
  localStorage.setItem("token", res.data.token);

  return res;
};

// REGISTER
export const register = async (data) => {
  const res = await api.post('/auth/register', data);

  // ✅ SAVE TOKEN (optional but recommended)
  localStorage.setItem("token", res.data.token);

  return res;
};

// GET USER
export const getCurrentUser = () => api.get('/auth/me');

// UPDATE USER
export const updateCurrentUser = (data) => api.patch('/auth/me', data);

// DELETE USER
export const deleteCurrentUser = () => api.delete('/auth/me');