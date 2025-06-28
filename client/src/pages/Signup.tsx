import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/auth';

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signupUser(form);
      alert('Signup successful');
      navigate('/login');
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Signup</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border mb-4"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Signup
      </button>
    </form>
  );
}
