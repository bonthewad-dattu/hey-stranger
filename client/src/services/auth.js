import api from './api';


export const login = async (data) => {
  const res = await api.post('/auth/login', data);


  localStorage.setItem("token", res.data.token);

  return res;
};


export const register = async (data) => {
  const res = await api.post('/auth/register', data);

 
  localStorage.setItem("token", res.data.token);

  return res;
};

export const getCurrentUser = () => api.get('/auth/me');

export const updateCurrentUser = (data) => api.patch('/auth/me', data);


export const deleteCurrentUser = () => api.delete('/auth/me');