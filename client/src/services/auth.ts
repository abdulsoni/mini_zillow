import { User } from '../types/User';
import api from './api';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  name: string;
  role: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = (data: LoginPayload) =>
  api.post<LoginResponse>('/auth/login', data);

export const signupUser = async (data: SignupPayload) => {
  return await axios.post('/api/auth/signup', data);
};

export const checkUser = () => {
  const token = localStorage.getItem('token');
  return axios.get<User>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
