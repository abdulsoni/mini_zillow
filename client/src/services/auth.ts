import { User } from '../types/User';
import api from './api'; // ✅ Use the shared Axios instance

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  name: string;
  role: string;
  userId:string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = (data: LoginPayload) =>
  api.post<LoginResponse>('/auth/login', data);

export const signupUser = async (data: SignupPayload) => {
  console.log('data', data);
  return await api.post('/auth/signup', data); // ✅ uses api, not raw axios
};

export const checkUser = () => {
  const token = localStorage.getItem('token');
  return axios.get<User>('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
