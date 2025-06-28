import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';
import { User } from '../types/User';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await loginUser({ email, password });
      console.log('res', res);

      const { token, role, name } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

      window.dispatchEvent(new Event('authChanged'));
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Login failed');
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border mb-4"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mb-4"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}
